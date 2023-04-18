const { Router } = require("express"); // Using the Express router
const {
  getPlans,
  getPlanById,
  getTopicById,
  getSubtopicById,
  likePost,
  addPost,
  addTopic,
  addSubtopic,
  editPlan,
  editTopic,
  editSubtopic,
  getTopTen,
  search,
  getMental,
  getEducation,
  getPhysical,
  getOther,
} = require("../controllers/planController");
const { requireLogin } = require("../middleware/authMiddleware");
const router = Router();

router.get("/", getPlans);

router.get("/top-plans", getTopTen);

router.get("/search", search);

//Plan Tags
router.get("/mental", getMental);
router.get("/education", getEducation);
router.get("/physical", getPhysical);
router.get("/other", getOther);

router.get("/:postid", getPlanById); // Should show all post details
router.get("/:postid/:topicid", getTopicById)
router.get("/:postid/:topicid/:subtopicid", getSubtopicById)
router.put("/:postid/like", requireLogin, likePost);

// Editing functionality
router.patch("/:postid/edit", requireLogin, editPlan); 
router.patch("/:postid/:topicid/edit", requireLogin, editTopic); 
router.patch("/:postid/:topicid/:subtopicid/edit", requireLogin, editSubtopic); 

router.post("/create", requireLogin, addPost); 
router.post("/create/:postid", requireLogin, addTopic);
router.post("/create/:postid/:topicid", requireLogin, addSubtopic);

module.exports = router; // Export router and import to server.js
