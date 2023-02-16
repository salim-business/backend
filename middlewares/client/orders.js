const jwt = require("jsonwebtoken");
const { validationResult, body } = require("express-validator");
const constants = require("../../constants");

module.exports = function (req, res, next) {
  console.log(req.body);
  let errors = validationResult(req);
  console.log(errors);
  console.log(req.params);
  if (!errors.isEmpty()) {
    if (!errors.isEmpty()) {
      // return res.status(400).json({ errors: errors.array() });
      return res.json({
        errors: errors.array(),
      });
    }
  }
  let token = req.header("token");
  console.log(token, "token clientt");
  jwt.verify(token, constants.SECRET_KEY, function (err, decoded) {
    if (err) {
      return next(
        new Error("You are not authenticated to make the order, Please log in")
      );
    }
    req.user = decoded;
    console.log(req.user);
    next();
  });
};
