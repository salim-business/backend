const mongoose = require("mongoose");
const io = require("../utils/socket");

const Schema = new mongoose.Schema(
  {
    imgId: { type: String },
    name: { type: String },
    cost: { type: String },
    category: { type: String },
  },
  {
    timestamps: true,
  }
);

Schema.post("findOneAndDelete", async function (doc) {
  console.log("middleware>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

  console.log(doc, "Item post save middlewarre. removed....");

  io.getIO().emit("deleteBeverage", doc);
});

Schema.post("save", function (doc) {
  console.log("savvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvingg");

  io.getIO().emit("newBeverage", doc);
});
module.exports = mongoose.model("Items", Schema);
