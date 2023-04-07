const { Router } = require("express");
const {
  getUsers,
  getUserById,
  updateUsername,
  updatePassword,
  deleteUser,
  addUser,
  getUserInfo,
  getUserLikes,
  getRecentPlansByUserId,
  getPlansByUserId,
} = require("../controllers/userController");

const { requireLogin } = require("../middleware/authMiddleware");

const router = Router();

router.get("/", getUsers);
router.get("/get-user-info", requireLogin, getUserInfo);
router.get("/:userid", getUserById);
router.get("/:userid/likes", getUserLikes);
router.get("/:userid/plans", getRecentPlansByUserId);
router.get("/:userid/all-plans", getPlansByUserId);

router.put("/update-username", requireLogin, updateUsername);
router.put("/update-password", requireLogin, updatePassword);

router.post("/add-user", addUser);

router.delete("/:userid", deleteUser);

module.exports = router;
