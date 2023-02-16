const express = require("express");
const { staffController, authController } = require("../../controllers");
const { authValidation } = require("../../validations");
const catchAsync = require("../../utils/catchAsync");
const validate = require("../../middlewares/validate");
const router = express.Router();

router.route("/").get(catchAsync(staffController.getProfile));

router
  .route("/updatePassword")
  .patch(
    validate(authValidation.updatePassword),
    catchAsync(authController.updatePassword)
  );

router.route("/profile").put(catchAsync(staffController.editProfile));

module.exports = router;
