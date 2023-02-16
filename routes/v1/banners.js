const express = require("express");
const router = express.Router();
const httpStatus = require("http-status");
const multer = require("multer");
const os = require("os");
const { attachmentController } = require("../../controllers");

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, os.tmpdir());
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + "-" + Date.now());
    },
  }),
});

router.route("/").post(upload.single("banner"), attachmentController.upload);

module.exports = router;
