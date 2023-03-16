const bcrypt = require("bcrypt");
const pool = require("../config/db");
const queries = require("../queries");
const asyncHandler = require("express-async-handler");

// @desc    Login user
// @route   POST /api/login/
// @access  Private (currently public)
const postLogin = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  console.log(username);

  const { rows: userInfo } = await pool.query(queries.getUserByUsername, [
    username,
  ]);
  console.log(userInfo);
  if (!userInfo.length) {
    res.status(401).send("Invalid username or password");
    return;
  }

  const passwordValid = await bcrypt.compare(password, userInfo[0].password);
  if (!passwordValid) {
    res.status(401).send("Invalid username or password");
    return;
  }

  req.session.username = username;
  req.session.password = password;
  res.status(200).send("Login success");
});

// @desc    Test endpoint for session
// @route   GET /api/login/test
// @access  Private (currently public)
const getTest = asyncHandler(async (req, res) => {
  console.log(req.session);
  res.json(req.session);
});

// @desc    Logout user
// @route   POST /api/login/logout
// @access  Private (currently public)
const postLogout = asyncHandler(async (req, res) => {
  req.session.destroy();
});

module.exports = {
  postLogin,
  getTest,
  postLogout,
};
