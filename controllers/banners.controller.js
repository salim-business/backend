const fs = require("fs");
const AppError = require("../utils/AppError");
const { bannersService, attachmentService } = require("../services");
const { Banners } = require("../models");
const xtend = require("xtend");
const { deleteSingleUpload } = require("../utils/storage");
const { log } = require("../logger");

exports.addBanner = async (req, res, next) => {
  console.log(req.body, " uploading>>>>>>>>>>>>>>>");

  const banner = await Banners.create(req.body);

  return res.json(banner);
};

// exports.delete = async (req, res, next) => {
//   console.log(req.params, " uploading>>>>>>>>>>>>>>>");

//   const banner = await Banners.findOneAndDelete({imgId: req.params.id})

//   return res.json(banner)
// };

exports.delete = async (req, res, next) => {
  console.log(req.params.id);
  Banners.findByIdAndRemove(req.params.id).then(async (doc, err) => {
    log(doc);
    const imageDeleted = await deleteSingleUpload(doc.imgId);
    log(imageDeleted);

    // return true;
    return res.status(200).json(imageDeleted);
  });
};
