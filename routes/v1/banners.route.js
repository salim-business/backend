const express = require("express");
const { bannersController } = require("../../controllers");
const { multer } = require("../../middlewares/upload");
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(bannersController.addBanner)

router.route("/:id").delete(bannersController.delete);
// router.get("/:fileName", bannersController.stream);

module.exports = router;
