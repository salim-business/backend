const { gridProducts } = require("../models");

const createItem = async (product) => {
  console.log(product, "service");
  return await gridProducts.create(product);
  // if (placeData.id) {
  //   return await Items.updateOne({ _id: placeData.id }, placeData);
  // } else {
  //   return await Items.create(placeData);
  // }
};

const deleteItem = async (itemId) => {
  const place = await gridProducts.findOneAndDelete({ _id: itemId });
  // const place = await Items.remove({ _id: itemId });
  return place;
};

module.exports = {
  deleteItem,
  createItem,
};
