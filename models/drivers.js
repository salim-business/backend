const mongoose = require("mongoose");

let Drivers = mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    vehicle: { type: String, required: true },
    vehicleSize: { type: String, required: true },
    latitude: { type: Number },
    longtude: { type: Number },
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

module.exports = mongoose.model("Drivers", Drivers);
