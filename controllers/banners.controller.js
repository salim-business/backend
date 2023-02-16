const fs = require("fs");
const AppError = require("../utils/AppError");
const { bannersService, attachmentService } = require("../services");
const { Banners } = require("../models");
const xtend = require("xtend");

exports.addBanner = async (req, res, next) => {
  console.log(req.body, " uploading>>>>>>>>>>>>>>>");

  const banner = await Banners.create(req.body)

  return res.json(banner)
};

exports.delete = async (req, res, next) => {
  console.log(req.params, " uploading>>>>>>>>>>>>>>>");

  const banner = await Banners.findOneAndDelete({imgId: req.params.id})

  return res.json(banner)
};


