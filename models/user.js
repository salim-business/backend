const mongoose = require("mongoose");
const statPlugin = require("./statistics.plugin");

let User = mongoose.Schema(
  {
    username: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    lastLogin: {
      type: Date,
      required: false,
      select: false,
    },
  },
  { timestamps: true }
);

User.plugin(statPlugin);
//add post save middleware to emit realtime update to admin on orders and users model

module.exports = mongoose.model("User", User);
