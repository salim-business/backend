const mongoose = require("mongoose");
const statPlugin = require("./statistics.plugin");
const io = require("../utils/socket");

let collection = mongoose.Schema(
  {
    tx_ref: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    // userId: {
    //   type: String,
    //   //required: true
    // },
    cost: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

collection.plugin(statPlugin);

collection.post("save", async function (doc) {
  let user = await this.model("User").findById(doc.user);

  console.log("collections model post save");

  console.log(doc, "collentions");

  io.getIO().emit("new collection", doc);

  // sendSms(
  //   user.phone,
  //   `${user.username}, Your Order with ref ${doc.order} has been Approved, thank you`,
  //   function (result) {}
  // );
});

module.exports = mongoose.model("collections", collection);
