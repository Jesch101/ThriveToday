const { Router } = require("express"); // Using the Express router
const controller = require("./controller");

const router = Router(); 

router.get("/", (req,res) => {
    res.send("Popular plans :3");
});

module.exports = router; // Export router and import to server.js