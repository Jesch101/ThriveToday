const { Router } = require("express");
const controller = require("./controller");

const router = Router(); 

router.get("/", controller.getUsers);
router.get("/:userid", controller.getUserById);

router.put("/:userid", controller.updateUser);

router.delete("/:userid", controller.deleteUser);

module.exports = router;