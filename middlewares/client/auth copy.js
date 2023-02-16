const { validationResult, body } = require("express-validator");
const { PhoneNumberUtil } = require("google-libphonenumber");

(exports.checkLoginDetails = body("username", "Username must be 3+ characters")
  .trim()
  .isLength({ min: 3 })),
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
    });
