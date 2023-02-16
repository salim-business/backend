const Driver = require("../models/drivers");
const AppError = require("../utils/AppError");
const { driverService } = require("../services");

exports.addDriver = async (req, res, next) => {
  const driver = await driverService.createDriver(req.body);
  res.json(driver);
};

exports.deleteDriver = async (req, res, next) => {
  let Driver = await driverService.deleteDriver(req.params.id);
  res.json(Driver);
};
