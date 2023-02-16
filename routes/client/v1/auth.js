const router = require("express").Router();
const AuthController = require("../../../controllers/client/auth.controller");

router.route("/").post(AuthController.authenticate);

router.get("/verify/:phone/:code", AuthController.verify);

module.exports = router;
