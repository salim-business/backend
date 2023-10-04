const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    category: { type: String, default: "Banner" },
    imgId: { type: String, required: true },
    title: { type: String, },
    h5: { type: String, },
    text: { type: String },
    imageUrl: { type: String, required: true }
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("Banners", Schema);
