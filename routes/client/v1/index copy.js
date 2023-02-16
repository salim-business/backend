var express = require("express");
var router = express.Router();
const { validationResult, body, check } = require("express-validator");
const { PhoneNumberUtil } = require("google-libphonenumber");
const authMiddleWare = require("../middlewares/orders.js");

const AuthController = require("../controllers/auth");
const OrderController = require("../controllers/orders");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// router.route("/signin").post(AuthController.authenticate);

router.get("/verify/:phone/:code", AuthController.verify);

router.post(
  "/makeorder",
  check("address.where", "please fill ur location").trim().not().isEmpty(),
  check("address.locale", "please fill this field").trim().not().isEmpty(),
  authMiddleWare,
  OrderController.makeOrder
);

router.post(
  "/signin", // username must be an email
  body("username", "Username must be 3+ characters")
    .trim()
    .isLength({ min: 3 }),
  // password must be at least 5 chars long
  body("phone", "Invalid phone number")
    .trim()
    .isLength({ min: 10 })
    .custom((phone) => {
      try {
        const phoneUtil = PhoneNumberUtil.getInstance();
        const number = phoneUtil.parseAndKeepRawInput(phone, "UG");
        return phoneUtil.isValidNumberForRegion(number, "UG");
      } catch (e) {
        return false;
      }
    }),
  AuthController.authenticate
);
module.exports = router;
