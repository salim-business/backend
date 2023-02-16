const mongoose = require("mongoose");


const Schema = new mongoose.Schema(
	
	{
		productId: {type: String, require: true},
		name: { type: String, required: true },
		cost: { type: String, required: true },
		category: { type: String, required: true },
		description: { type: String, required: true },
		imgIds: [{ type: String, required: true }],
		streamIds: [{ type: String, required: true }],
		cookies: {type: String, require: true},
		quantity: {type: String, require: true, default: '1'}
	},
	{
		timestamps: true,
	}
	
);


module.exports = mongoose.model("Cart", Schema);
