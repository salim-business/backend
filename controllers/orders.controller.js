const OrderModel = require("../models/orders");
const UserModel = require("../models/user");
const NotifyModel = require("../models/notify");
const DeliveryOrderModel = require("../models/delivery");
const notify = require("../models/notify");
const { orderService } = require("../services");
const io = require("../utils/socket");

exports.getOrders = async function (req, res, next) {
  let orders = await OrderModel.find(req.query).populate({
    path: "user",
    select: "username phone",
  });
  res.json(orders);
};

exports.getOrder = async function (req, res, next) {
  let order = await OrderModel.findById(req.params.id);
  res.json(order);
};

exports.update = async function (req, res) {
  let order = await OrderModel.findByIdAndUpdate(
    req.params.updateId,
    {
      status: "APPROVED",
      confirmedAt: new Date(),
    },
    (err, order) => {
      if (order) {
        res.json(order);
      }
    }
  );
  // res.json(order);
};

exports.deleteOrder = async function (req, res, next) {
  let order = await orderService.deleteOrder(req.params.id);
  res.json(order);
};

exports.deleteDeliveryOrder = async function (req, res, next) {
  let order = await orderService.deleteDeliveryOrder(req.params.id);
  res.json(order);
};

exports.getOrders = async function (req, res) {
  let orders = await OrderModel.find(req.query).populate({
    path: "user",
    select: "username phone",
  });
  res.json(orders);
};

exports.confirmOrder = async function (req, res, next) {
  // io.emit("test", { data: "hi" });
  console.log("starting to confirm, order controller");

  const order = await orderService.approveOrder(req.params.id);
  // console.log("service done, order controller");

  res.json({
    order: order._id,
    user: order.user,
    status: order.status,
    confirmedAt: order.confirmedAt,
  });
};

exports.confirmDeliveryOrder = async function (req, res, next) {
  // console.log("orderToApprove");
  const order = await orderService.approveDeliveryOrder(req.params.id);

  res.json({
    order: order._id,
    user: order.user,
    status: order.status,
    confirmedAt: order.confirmedAt,
  });
};
