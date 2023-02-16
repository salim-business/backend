const { Places } = require("../models");

const createPlace = async (placeData) => {
  console.log(placeData, "service");
  if (placeData.id) {
    return await Places.updateOne({ _id: placeData.id }, placeData);
  } else {
    return await Places.create(placeData);
  }
};

const deletePlace = async (driverId) => {
  const place = await Places.findByIdAndRemove(driverId);
  return place;
};

module.exports = {
  deletePlace,
  createPlace,
};
