const httpStatus = require("http-status");
const AppError = require("../utils/AppError");
const multer = require("multer");
const os = require("os");
const uuid = require("uuid");



const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      // console.log(req.body, "upload req body>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
      cb(null, os.tmpdir());
    },
    filename: (req, file, cb) => {
      let splitted = file.originalname.split(".");
      console.log(splitted, "spliteed");
      console.log(splitted[splitted.length - 1]);
      // console.log(, 'multer req')

      cb(null, `${uuid.v4()}.${splitted[splitted.length - 1]}`);


      // cb(null, `${splitted[0]}`);
    },
  }),
}).single("banner"); //name attribute of the html el.

exports.multer = function (req, res, next) {

  upload(req, res, function (err) {

    if (err) {
      return next(new AppError(err.message, httpStatus.BAD_REQUEST));
    }
    next();
  });
};
