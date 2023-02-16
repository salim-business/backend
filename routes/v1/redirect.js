const express = require("express");
const router = express.Router();
const { OTPController } = require("../../controllers");

router
  .route("/")
  .post((req, res) => {
    console.log(
      req.query,
      "redirect post>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
    );
  })
  .get((req, res) => {
    console.log(
      req.query,
      "redirect get>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
    );
  });

module.exports = router;
