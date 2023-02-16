const express = require("express");
const router = express.Router();
const axios = require("axios");
const { webhookController } = require("../../controllers");

router.route("/").post(webhookController.post).get(webhookController.get);

module.exports = router;
