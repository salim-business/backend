const jwt = require("jsonwebtoken");
const constants = require("../constants");

let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluIiwiaXNBZG1pbiI6dHJ1ZSwiaXNSb290Ijp0cnVlLCJpYXQiOjE2MzA2MTU0NzV9.cwjlh7wWjcU6S5TVEDzCFifM8ocrfCT2JzHZSNMxvWY";

jwt.verify(token, constants.SECRET_KEY, function (err, decoded) {
  if (err) {
    // return next(new Error("Please log in"));
    return err;
  }
  console.log(decoded);
});
