const { Router } = require("express"); // Using the Express router
const controller = require("./controller");

const router = Router(); 

router.get("/", (req,res) => {
    res.send("Sign up :3");
});

router.post("/", controller.addUser);

module.exports = router; // Export router and import to server.js