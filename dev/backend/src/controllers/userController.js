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
    res.status(200).json(rows);
  } catch (e) {
    throw e;
  }
});

// @desc    Add new user
// @route   POST /api/users/add-user
// @access  Public
const addUser = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, username, password } = req.body;
  const MIN_PASSWORD_LENGTH = 5;

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
    const { rows } = await pool.query(queries.addUser, [
      firstname,
      lastname,
      email,
      username,
      hash,
    ]);
    req.session.loggedIn = true;
    req.session.userID = rows[0].userid;
    res.status(201).send("User added and logged in successfully");
  } catch (e) {
    res.status(500).send("There was a problem adding the user to the database");
  }
});

// @desc    Update username
// @route   PUT /api/users/update-username
// @access  Private
const updateUsername = asyncHandler(async (req, res) => {});

// @desc    Update user password
// @route   PUT /api/users/update-password
// @access  Private
const updatePassword = asyncHandler(async (req, res) => {});

const updateEmail = asyncHandler(async (req, res) => {});

// @desc    Delete user
// @route   DELETE /api/users/:userid
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {});

module.exports = {
  getUsers,
  getUserById,
  addUser,
  updateUsername,
  updatePassword,
  updateEmail,
  deleteUser,
};
