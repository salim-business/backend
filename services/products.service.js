const { Products, Attachment } = require("../models");
const gfsService = require("./gfs.service");
const { log } = require("../logger");

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

const deleteItem = async (itemId) => {
	log(itemId);

	await Products.findOne({ _id: itemId }).then( (doc, err) => {
		log(err)
		log(doc)
		doc.imgIds.forEach(async (id) => {
			await Attachment.findByIdAndDelete(id)
		});

		doc.streamIds.forEach((id) => {
			gfsService.delete(id);
		});
	});

	return await Products.deleteOne({ _id: itemId })
};

module.exports = {
	deleteItem,
	createItem,
	editItem
};
