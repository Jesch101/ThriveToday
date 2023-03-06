const { Router } = require("express"); // Using the Express router
const controller = require("./controller");

const router = Router(); 

router.get("/", controller.getPlans);

router.get("/:postid", controller.getPlanById); // Should show all post details

router.post("/create", controller.addPost); // Route names can be changed but keep /:postid/:topicid structure 
router.post("/create/:postid", controller.addTopic);
router.post("/create/:postid/:topicid", controller.addSubtopic);

module.exports = router; // Export router and import to server.js