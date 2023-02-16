const mongoose = require("mongoose");
const statPlugin = require("./statistics.plugin");
const io = require("../utils/socket");
const sendSms = require("../utils/client/sms");

let orderSchema = mongoose.Schema(
	{
		productId: {type: String, require: true},
		name: { type: String, required: true },
		cost: { type: String, required: true },
		category: { type: String, required: true },
		description: { type: String, required: true },
		imgIds: [{ type: String, required: true }],
		streamIds: [{ type: String, required: true }],
		cookies: {type: String, require: true},
		quantity: {type: String, require: true, default: '1'},
    country: { type: String, required: true },
    city: { type: String, required: true },
    contact: { type: String, required: true },


	},
	{
		timestamps: true,
	},

);

orderSchema.plugin(statPlugin);


module.exports = mongoose.model("orders", orderSchema);
