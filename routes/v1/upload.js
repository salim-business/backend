const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });
const {
  s3Upload,
  getObjectSignedUrl,
  checkSignedUrls,
  s3UploadSingle,
  deleteUpload,
} = require("../../utils/storage");
router.route("/").get(function (req, res) {
  res.status(200).json({
    test: "WOKING",
  });
});
// router.post(
//     "/upload",
//     upload.single("image"),
//     async (req, res, next) => {
//       console.log(req.file);

//       const url = await s3UploadSingle(req.file);

//       res.status(200).json({
//         url,
//       });
//     }
//   );

router.route("/").post(upload.single("image"), async (req, res, next) => {
  console.log(req.file);

  const url = await s3UploadSingle(req.file);

  res.status(200).json({
    url,
  });
});

module.exports = router;
