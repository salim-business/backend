const express = require("express");
const router = express.Router();
const { driversController } = require("../../controllers");

router
  .route("/")
  .post(driversController.addDriver)
  .patch(driversController.addDriver);

router.route("/:id").delete(driversController.deleteDriver);

module.exports = router;
