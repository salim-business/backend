const { gridProducts } = require("../models");
const AppError = require("../utils/AppError");
const { gridProductsService } = require("../services");

exports.addItem = async (req, res, next) => {
  console.log(req.body, "items....");
  const item = await gridProductsService.createItem(req.body);
  res.json(item);
};

exports.getItem = async (req, res) => {
  const items = await gridProducts.find();
  res.json(items);
};

exports.deleteItem = async (req, res, next) => {
  let place = await gridProductsService.deleteItem(req.params.id);
  res.json(place);
};
