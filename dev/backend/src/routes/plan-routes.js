const { Router } = require("express"); // Using the Express router
const controller = require("./controller");

const router = Router(); 

router.get("/", controller.getPlans);

router.get("/:postid", controller.getPlanById);

module.exports = router; // Export router and import to server.js