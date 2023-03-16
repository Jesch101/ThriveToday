const { Router } = require("express");
const {
  getUsers,
  getUserById,
  updateUsername,
  updatePassword,
  deleteUser,
  addUser,
} = require("../controllers/userController");

const router = Router();

router.get("/", getUsers);
router.get("/:userid", getUserById);

router.put("/update-username", updateUsername);
router.put("/update-password", updatePassword);
router.put("/add-user", addUser);
// router.put("/:userid", updateUsername);

router.delete("/:userid", deleteUser);

module.exports = router;
