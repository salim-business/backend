const { Products, Attachment } = require("../models");
const gfsService = require("./gfs.service");
const { log } = require("../logger");
const {deleteUpload} = require("../utils/storage");


const createItem = async (product) => {
	// console.log(product, "service");
	return await Products.create(product);
	// if (placeData.id) {
	//   return await Items.updateOne({ _id: placeData.id }, placeData);
	// } else {
	//   return await Items.create(placeData);
	// }
};

const editItem = async product => {
	// return console.log(product, "to be edited >>>>>>>>>>>>>>>");
	delete product.imgIds;
	delete product.streamIds;
	const saved = await Products.findById(product._id);
	return await Products.findByIdAndUpdate(product._id, product)
	// if (placeData.id) {
	//   return await Items.updateOne({ _id: placeData.id }, placeData);
	// } else {
	//   return await Items.create(placeData);
	// }
};

const deleteItem = async (productId) => {
	
	Products.findByIdAndRemove(productId).then(async (doc, err) => {
	  log(doc);
	  const imageDeleted = await deleteUpload(doc.imgIds);
	  log(imageDeleted);
	  return true
	});
  };

module.exports = {
	deleteItem,
	createItem,
	editItem
};
