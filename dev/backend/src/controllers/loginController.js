const bcrypt = require("bcrypt");
const pool = require("../config/db");
const queries = require("../queries");
const asyncHandler = require("express-async-handler");

// @desc    Login user
// @route   POST /api/login/
// @access  Public
const postLogin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const { rows: userInfo } = await pool.query(queries.getUserByUsername, [
    username,
  ]);
  if (!userInfo.length) {
    res.status(401).send("Invalid username or password");
    return;
  }

  const passwordValid = await bcrypt.compare(password, userInfo[0].password);
  if (!passwordValid) {
    res.status(401).send("Invalid username or password");
    return;
  }

  req.session.loggedIn = true;
  req.session.userID = userInfo[0].userid;

  res.status(200).send("Login success");
});

// @desc    Test endpoint for session
// @route   GET /api/login/test
// @access  Public
const getTest = asyncHandler(async (req, res) => {
  console.log(req.session);
  res.json(req.session);
});

// @desc    Logout user
// @route   POST /api/login/logout
// @access  Private
const postLogout = asyncHandler(async (req, res) => {
  req.session.destroy();
});

module.exports = {
  postLogin,
  getTest,
  postLogout,
};
