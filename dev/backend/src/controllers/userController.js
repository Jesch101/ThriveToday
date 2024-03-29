const bcrypt = require("bcrypt");
const pool = require("../config/db");
const queries = require("../queries");
const asyncHandler = require("express-async-handler");

// @desc    Get all users
// @route   GET /api/users/
// @access  Public
const getUsers = asyncHandler(async (req, res) => {
  pool.query(queries.getUsers, (err, db) => {
    if (err) {
      console.error(err);
      res.send("Query failed");
      return;
    }
    res.json({ users: db.rows });
  });
});

// @desc    Get users given user ID
// @route   GET /api/users/:userid
// @access  Public
const getUserById = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.userid);
  try {
    const { rows } = await pool.query(queries.getUserById, [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    const { password, ...userData } = rows[0];
    res.status(200).json(userData);
  } catch (e) {
    console.log("I'm in here");
    console.error(e);
    res.status(500).json({ message: "Server error" });
  }
});

// @desc    Add new user
// @route   POST /api/users/add-user
// @access  Public
const addUser = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, username, password } = req.body;
  const MIN_PASSWORD_LENGTH = 5;
  const validEmailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!validEmailRegex.test(email)) {
    res.status(400).send("Invalid email format.");
    return;
  }
  const { rows: userExistsRows } = await pool.query(
    queries.checkUsernameExists,
    [username]
  );
  if (userExistsRows?.length) {
    res.status(400).send("Username already exists.");
    return;
  }
  const { rows: emailRows } = await pool.query(queries.checkEmailExists, [
    email,
  ]);
  if (emailRows?.length) {
    res.status(400).send("Email already exists.");
    return;
  } else if (password?.length < MIN_PASSWORD_LENGTH) {
    res.status(400).send("Password is too short.");
    return;
  }

  const hash = await bcrypt.hash(password, 12);

  try {
    await pool.query(queries.addUser, [
      firstname,
      lastname,
      email,
      username,
      hash,
    ]);
    const {
      rows: [userInfo],
    } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    delete userInfo.password;
    req.session.loggedIn = true;
    req.session.userID = userInfo.userid;
    res.status(201).json(userInfo);
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .send(
        "There was a problem adding the user to the database, see console for more details"
      );
  }
});

// @desc    Get user info given user is logged in
// @route   GET /api/users/get-user-info
// @access  Private
const getUserInfo = asyncHandler(async (req, res) => {
  if (!req.session?.userID && req.session?.loggedIn) {
    res.status(401);
    return;
  }

  let id = req.session?.userID;
  try {
    const { rows } = await pool.query(queries.getUserById, [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    const { password, ...userData } = rows[0];
    res.status(200).json(userData);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error" });
  }
});

// @desc    Get users liked posts
// @route   GET /api/users/:userid/likes
// @access  Private
const getUserLikes = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.userid);

  const { rows } = await pool.query(queries.getUserLikes, [id])

  if (rows.length == 0) {
    res.status(200).send("This user has no likes");
  } else {
    res.status(200).json(rows);
  }
});

// @desc    Get users 5 most recent plans
// @route   GET /api/users/:userid/plans
// @access  Private
const getRecentPlansByUserId = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.userid);
  const { rows } = await pool.query(queries.getRecentPlansByUserId, [id]);
  if (rows.length == 0) {
    res.status(200).send("This user has not created any plans");
  } else {
    res.status(200).json(rows);
  }
});

// @desc    Get users plans
// @route   GET /api/users/:userid/all-plans
// @access  Private
const getPlansByUserId = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.userid);
  const { rows } = await pool.query(queries.getPlansByUserId, [id]);
  if (rows.length == 0) {
    res.status(204).send("This user has not created any plans");
  } else {
    res.status(200).json(rows);
  }
});

// @desc    Update username
// @route   PUT /api/users/update-username
// @access  Private
const updateUsername = asyncHandler(async (req, res) => {
  const { id, newUsername } = req.body;

  const { rows: checkUser } = await pool.query(queries.getUserById, [id]);
  if (!checkUser?.length) {
    res.send("User does not exist in our database, sorry");
  }

  try {
    await pool.query(queries.updateUser, [newUsername, id]);
    res.status(200).send("User updated successfully");
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .send(
        "There was a problem with updating the user, see console for more details"
      );
  }
});

// @desc    Update password
// @route   PUT /api/users/update-password
// @access  Private
const updatePassword = asyncHandler(async (req, res) => {
  const { id, currentPassword, newPassword } = req.body;

  // First, check if the user exists
  const { rows: checkUser } = await pool.query(queries.getUserById, [id]);
  console.log(checkUser)//good way to check when making requests
  console.log(id)
  if (!checkUser?.length) {
    res.status(400).send("User does not exist in our database, sorry");
    return
  }

  // Retrieve the user's original password hash from the database
  const { rows: user } = await pool.query(queries.getUserPasswordById, [id]);
  const originalPasswordHash = user[0].password;

  // Hash the user's current password and compare it to the original password hash
  const isPasswordValid = await bcrypt.compare(currentPassword, originalPasswordHash);
  if (!isPasswordValid) {
    res.status(400).send("Incorrect current password");
  }

  let saltRounds = 10;
  // Hash the user's new password and update the password hash in the database
  const newHashedPassword = await bcrypt.hash(newPassword, saltRounds);
  try {
    await pool.query(queries.updateUserPassword, [newHashedPassword, id]);
    res.status(200).send("Password updated successfully")
  } catch (e) {
    console.error(e);
    res.status(500).send("There was a problem with updating the password, see console for more details");
  }
});

// @desc    Update email
// @route   PUT /api/users/update-email
// @access  Private
const updateEmail = asyncHandler(async (req, res) => {
  
  let { id, newEmail } = req.body;
  id=Number(id);
  console.log(id,newEmail);
  console.log(queries.getUserById);
  // First, check if the user exists
 
    const { rows: checkUser } = await pool.query(queries.getUserById, [id]);
 console.log(checkUser);
  if (!checkUser?.length) {
    res.send("User does not exist in our database, sorry");
  }

  try {
    // If the user exists, update their email
    await pool.query(queries.updateEmail, [newEmail, id]);
    res.status(200).send("Email updated successfully")
  } catch (e) {
    console.error(e);
    res.status(500).send("There was a problem with updating the email, see console for more details");
  }
});


// @desc    Delete user
// @route   DELETE /api/users/:userid
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.userid);
  const { rows: userRows } = await pool.query(queries.getUserById, [id]);
  if (!userRows?.length) {
    res.send("User does not exist in our database, sorry");
  }
  try {
    await pool.query(queries.deleteUser, [id]);
    res.status(200).send("User removed successfully");
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .send(
        "There was a problem with deleting the user, see console for more details"
      );
  }
});

module.exports = {
  getUsers,
  getUserById,
  getUserInfo,
  addUser,
  getUserLikes,
  getRecentPlansByUserId,
  getPlansByUserId,
  updateUsername,
  updatePassword,
  updateEmail,
  deleteUser,
};
