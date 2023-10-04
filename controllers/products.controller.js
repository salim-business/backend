const { Product } = require("../models");
const AppError = require("../utils/AppError");
const { productsService } = require("../services");
const { checkSignedUrls } = require("../utils/storage");


exports.addItem = async (req, res, next) => {
  console.log(req.body, "items....");
  try {
    const item = await productsService.createItem(req.body);
    res.json(item);
  } catch (error) {
    res.send(error)
  }

};

exports.editItem = async (req, res, next) => {
	console.log(req.body, "items to be ....");
	try {
		const item = await productsService.editItem(req.body);
		res.json(item);
	} catch (error) {
		res.send(error);
	}
};


exports.getItem = async (req, res) => {
  const products = await Product.find();
  
  const productsWithUrls = await checkSignedUrls(products);
  res.json({
    items: productsWithUrls
  });
};

exports.deleteItem = async (req, res, next) => {
  let place = await productsService.deleteItem(req.params.id);
  res.json(place);
};
