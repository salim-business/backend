const express = require("express");
const { gfsController } = require("../../controllers");

const { multer } = require("../../middlewares/upload");
const router = express.Router({ mergeParams: true });

router.route("/").get(gfsController.uploads).post(multer, gfsController.upload);
router.route("/:id").delete(gfsController.delete);
router.get("/preview/:fileName", gfsController.stream);
router.get("/preview/:fileName/:width", gfsController.stream); //for hovered image
router.route("/items").post(multer, gfsController.upload);

module.exports = router;
