const express = require("express");
const router = express.Router();
const { placesController } = require("../../controllers");

router
  .route("/")
  .post(placesController.addPlace)
  .get(placesController.getPlace)
  .patch(placesController.addPlace);

router.route("/:id").delete(placesController.deletePlace);

module.exports = router;
