const { Router } = require("express"); // Using the Express router
const {
  getPlans,
  getPlanById,
  likePost,
  addPost,
  addTopic,
  addSubtopic,
} = require("../controllers/planController");
const { requireLogin } = require("../middleware/authMiddleware");
const router = Router();

router.get("/", getPlans);

router.get("/:postid", getPlanById); // Should show all post details
router.put("/:postid/like", requireLogin, likePost);

// Editing functionality
router.patch("/:postid/edit", requireLogin, editPlan); 
router.patch("/:postid/:topicid/edit", requireLogin, editTopic); 
router.patch("/:postid/:topicid/:subtopicid/edit", requireLogin, editSubtopic); 

router.post("/create", requireLogin, addPost); 
router.post("/create/:postid", requireLogin, addTopic);
router.post("/create/:postid/:topicid", requireLogin, addSubtopic);

module.exports = router; // Export router and import to server.js
