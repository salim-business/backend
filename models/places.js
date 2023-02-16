const mongoose = require("mongoose");
const io = require("../utils/socket");

let Places = mongoose.Schema(
  {
    where: { type: String, required: true },
    spot: { type: String, required: true },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timeStamps: true,
  }
);
Places.post("save", async function (doc) {
  console.log("middleware");
  console.log(doc);

  io.getIO().emit("newPlace", {
    where: doc.where,
    spot: doc.spot,
    // confirmedAt: doc.createdAt,
  });

  // sendSms(
  //   user.phone,
  //   `${user.username}, Your Order with ref ${doc.order} has been Approved, thank you`,
  //   function (result) {}
  // );
});

module.exports = mongoose.model("Places", Places);
