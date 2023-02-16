const mongoose = require("mongoose");
const statPlugin = require("./statistics.plugin");

let Order = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      default: "Moving",
    },
    moveType: {
      type: String,
      required: true,
      enum: ["Within Kampala", "Outside Kampala"],
    },
    pickUpAddress: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    destinationAddress: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    pickUpAddressName: {
      type: String,
      default: "unknown",
    },
    destinationAddressName: {
      type: String,
      default: "unknown",
    },
    shiftNeed: { type: String, required: true },
    scheduleDate: { type: String, required: true },
    scheduleTime: { type: String, required: true },
    status: {
      type: String,
      default: "PENDING",
      enum: ["PENDING", "APPROVED"],
    },
    confirmedAt: {
      type: Date,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    // timestamps: { currentTime: () => Date.now() },
    timestamps: true,
  }
);

Order.plugin(statPlugin);

module.exports = mongoose.model("Order", Order);
