const { Router } = require("express"); // Using the Express router
const controller = require("./controller");

const router = Router(); // Router object

router.get("/", (req,res) => {
    res.send("Sign up :3");
});

module.exports = router; // Export router and import to server.js