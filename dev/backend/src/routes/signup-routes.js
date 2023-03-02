const { Router } = require("express"); // Using the Express router
const controller = require("./controller");

const router = Router(); 

router.post("/", controller.addUser);

module.exports = router; // Export router and import to server.js