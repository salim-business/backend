const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    name: { type: String },
    uuid: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("otherAttachment", Schema);
