const express = require("express");
const router = express.Router();

const {
  postLogin,
  getTest,
  postLogout,
} = require("../controllers/loginController");

const { requireLogin } = require("../middleware/authMiddleware");

router.post("/", postLogin);

router.get("/test", getTest);

router.post("/logout", requireLogin, postLogout);

module.exports = router;
