const { Router } = require("express"); // Using the Express router

const router = Router(); // Router object

router.get("/", (req,res) => {
    res.send("about us >:o ");
});

module.exports = router; // Export router and import to server.js