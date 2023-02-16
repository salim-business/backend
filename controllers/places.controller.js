const Place = require("../models/places");
const AppError = require("../utils/AppError");
const { placesService } = require("../services");

exports.addPlace = async (req, res, next) => {
  // console.log(req.body, "hdhdhd");
  const place = await placesService.createPlace(req.body);
  res.json(place);
};

exports.getPlace = async (req, res) => {
  const places = await Place.find();
  res.json(places);
};
exports.deletePlace = async (req, res, next) => {
  let Place = await placesService.deletePlace(req.params.id);
  res.json(Place);
};
