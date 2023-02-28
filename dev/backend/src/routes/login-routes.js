const { Router } = require("express"); // Using the Express router
const controller = require("./controller");

const router = Router(); // Router object

router.get("/", (req,res) => {
    res.send("Log in");
});

module.exports = router; // Export router and import to server.js