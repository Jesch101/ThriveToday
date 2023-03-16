const express = require("express");
const router = express.Router();

const {
  postLogin,
  getTest,
  postLogout,
} = require("../controllers/loginController");

router.post("/", postLogin);

router.get("/test", getTest);

router.post("/logout", postLogout);

module.exports = router;
