const { Router } = require("express");
const {
  getUsers,
  getUserById,
  updateUsername,
  updatePassword,
  deleteUser,
  addUser,
  getUserInfo,
} = require("../controllers/userController");

const { requireLogin } = require("../middleware/authMiddleware");

const router = Router();

router.get("/", getUsers);
router.get("/get-user-info", requireLogin, getUserInfo);
router.get("/:userid", getUserById);

router.put("/update-username", requireLogin, updateUsername);
router.put("/update-password", requireLogin, updatePassword);

router.post("/add-user", addUser);

router.delete("/:userid", deleteUser);

module.exports = router;
