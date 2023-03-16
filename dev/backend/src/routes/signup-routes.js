const { Router } = require("express"); // Using the Express router
const { addUser } = require("../controllers/userController");

const router = Router();

router.post("/", addUser);

module.exports = router; // Export router and import to server.js
