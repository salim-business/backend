const express = require("express");
const { authController } = require("../../controllers");
const { authValidation, staffValidation } = require("../../validations");
const validate = require("../../middlewares/validate");
const authMiddleware = require("../../middlewares/auth");
const catchAsync = require("../../utils/catchAsync");
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(
    catchAsync(authMiddleware.authenticate),
    catchAsync(authMiddleware.authenticateAdmin),
    validate(staffValidation.account),
    catchAsync(authController.signup)
  )
  .patch(catchAsync(authController.signup));

router
  .route("/login")
  .post(validate(authValidation.login), catchAsync(authController.login));

router.route("/:id").delete(catchAsync(authController.deleteUser));

module.exports = router;
