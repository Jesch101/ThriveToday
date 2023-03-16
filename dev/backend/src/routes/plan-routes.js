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

router.post("/create", requireLogin, addPost); // Route names can be changed but keep /:postid/:topicid structure
router.post("/create/:postid", requireLogin, addTopic);
router.post("/create/:postid/:topicid", requireLogin, addSubtopic);

module.exports = router; // Export router and import to server.js
