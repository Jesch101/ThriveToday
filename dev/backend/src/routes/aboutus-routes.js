const { Router } = require("express"); // Using the Express router
const controller = require("./controller");

const router = Router(); 

router.get("/", (req,res) => {
    res.send("about us >:o ");
});

module.exports = router; // Export router and import to server.js