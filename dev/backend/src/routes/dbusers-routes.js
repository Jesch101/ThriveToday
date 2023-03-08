const { Router } = require("express");
const controller = require("../controller");

const router = Router(); 

router.get("/", controller.getUsers);
router.get("/:userid", controller.getUserById);

router.put("/update-username", controller.updateUsername);
router.put("/update-password", controller.updatePassword);
// router.put("/:userid", controller.updateUsername);

router.delete("/:userid", controller.deleteUser);

module.exports = router;