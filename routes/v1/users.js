const express = require("express");
const router = express.Router();
const { usersController } = require("../../controllers");

router.route("/").post(usersController.addUser);
router.route("/:id").delete(usersController.deleteUser);
//   .patch(usersController.confirmOrder);
module.exports = router;
