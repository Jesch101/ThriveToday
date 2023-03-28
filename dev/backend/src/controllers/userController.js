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
  const validEmailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!validEmailRegex.test(email)) {
    res.status(400).send("Invalid email format.");
    return;
  }
  const { rows: userExistsRows } = await pool.query(queries.checkUsernameExists, [
    username
  ]);
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

  const userId = req.params.userid;

  // 1. Retrieve user from the database
  const user = await User.findById(userId);

  // 2. Check if user exists
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // 3. Retrieve the user's liked posts
  const likedPosts = await Post.find({ likes: { $in: [userId] } }).populate('author', 'username');

  // 4. Return the user's liked posts
  res.status(200).json({ likedPosts });

});


// @desc    Update username
// @route   PUT /api/users/update-username
// @access  Private

// Henry: from min 59 of Beaufort's video he put in routes.js router.put("/:id", controller.updateStudent)
const updateUsername = asyncHandler(async (req, res) => {
      //get id out of the parameters
      const id = parseInt(req.params.id);
      //get name that we wanna update
      const { name } = req.body
  
      pool.query(queries.getUserById, [id], (error, results) => {
          if(noUserFound){
              res.send("Student does not exist in our database, sorry")
              }
              //updateUser is correct here? first variable is name in queries.js then second is id in queries
              pool.query(queries.updateUser, [name, id], (error, results) => {
                  if (error) throw error;
                  res.status(200).send("Student updated successfully")
              });
      });
  });
  

// @desc    Update user password
// @route   PUT /api/users/update-password
// @access  Private
const updatePassword = asyncHandler(async (req, res) => {
const { oldPassword, newPassword } = req.body;
  const userId = req.user.id;

  // 1. Retrieve user from the database
  const user = await User.findById(userId);

  // 2. Check if old password is correct
  if (!await user.checkPassword(oldPassword)) {
    return res.status(400).json({ message: "Invalid old password" });
  }

  // 3. Update the user's password
  user.password = newPassword;
  await user.save();

  // 4. Return success response
  res.status(200).json({ message: "Password updated successfully" });

});

const updateEmail = asyncHandler(async (req, res) => {

  const { email } = req.body;
  const userId = req.user._id;

  // 1. Retrieve user from the database
  const user = await User.findById(userId);

  // 2. Check if user exists
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // 3. Update the user's email
  user.email = email;
  await user.save();

  // 4. Return success response
  res.status(200).json({ message: "Email updated successfully" });
});

// @desc    Delete user
// @route   DELETE /api/users/:userid
// @access  Private

// Henry: from min 51 of Beaufort Tek's 'Build a Rest Api w NodeJS' video: https://youtu.be/DihOP19LQdg?t=3060
const deleteUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  // 1. Retrieve user from the database
  const user = await User.findById(userId);

  // 2. Check if user exists
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // 3. Delete the user
  await user.remove();

  // 4. Return success response
  res.status(200).json({ message: "User deleted successfully" });
  
    //check if student exists in database otherwise send user not found
    //is the getUserByID query correct here?
    // pool.query(queries.getUserById, [id], (error, results) => {
    //     // if length of results is 0 then there is no user found, could not delete user
    //     const noUserFound = !results.rows.length
    //     if(noUserFound){
    //     res.send("User does not exist in our database, sorry")
    //     }
    //     pool.query(queries.deleteUser, [id], (error, results) => {
    //         if (error) throw error;
    //         res.status(200).send("Student removed successfully")
    //     });
    // });
});

module.exports = {
  getUsers,
  getUserById,
  getUserInfo,
  addUser,
  getUserLikes,
  updateUsername,
  updatePassword,
  updateEmail,
  deleteUser,
};
