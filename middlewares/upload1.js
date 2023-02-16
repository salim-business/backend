const httpStatus = require("http-status");
const AppError = require("../utils/AppError");
const multer = require("multer");
const os = require("os");

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, os.tmpdir());
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + "-" + Date.now());
    },
  }),
}).single("file");

exports.multer = function (req, res, next) {
  console.log("am here");
  console.log(res);

  upload(req, res, function (err) {
    if (err) {
      return next(new AppError(err.message, httpStatus.BAD_REQUEST));
    }
    next();
  });
  next();
  // res.send(req.file);
};
