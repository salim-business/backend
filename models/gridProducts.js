const mongoose = require("mongoose");


const Schema = new mongoose.Schema(
  {
		name: { type: String, required: true },
		cost: { type: String, required: true },
		category: { type: String, required: true },
		variant: { type: String, required: true },
		stock: { type: String, required: true },
		description: { type: String, required: true },
		imgIds: [{ type: String, required: true }],
		streamIds: [{ type: String, required: true }],
	},
	{
		timestamps: true,
	}
);


module.exports = mongoose.model("gridProducts", Schema);
