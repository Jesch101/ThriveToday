const { Router } = require("express"); // Using the Express router
const {
  getPlans,
  getPlanById,
  likePost,
  addPost,
  addTopic,
  addSubtopic,
} = require("../controllers/planController");
const router = Router();

router.get("/", getPlans);

router.get("/:postid", getPlanById); // Should show all post details
router.put("/:postid/like", likePost);

router.post("/create", addPost); // Route names can be changed but keep /:postid/:topicid structure
router.post("/create/:postid", addTopic);
router.post("/create/:postid/:topicid", addSubtopic);

module.exports = router; // Export router and import to server.js
