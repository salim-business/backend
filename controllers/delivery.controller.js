const { Delivery, Notify } = require("../models");

exports.getOrder = async function (req, res, next) {
  let order = await Delivery.findById(req.params.id);
  res.json(order);
};

exports.deleteOrder = async function (req, res, next) {
  let order = await Delivery.findByIdAndDelete(req.params.id);
  res.json(order);
};

// exports.getOrders = async function (req, res) {
//   let orders = await Delivery.find(req.query).populate({
//     path: "user",
//     select: "username phone",
//   });
//   res.json(orders);
// };
