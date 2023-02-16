const mongoose = require("mongoose");
const bcryptPlugin = require("mongoose-bcrypt");
const searchPlugin = require("./search.plugin");
const statsPlugin = require("./statistics.plugin");

const Schema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please Enter username!"],
      unique: [true, "Username already in use!"],
      validate: {
        validator: function (username) {
          return !["admin"].includes(username.toLowerCase());
        },
        message: "Username already taken!",
      },
    },
    password: { type: String, select: false, bcrypt: true },
    roles: [{ type: String }],
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

Schema.plugin(bcryptPlugin, { rounds: 8 });
Schema.plugin(searchPlugin, ["username"]);
Schema.plugin(statsPlugin);

module.exports = mongoose.model("Staff", Schema);
