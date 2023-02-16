const { Notify, Order, Delivery } = require("../models");
const authService = require("./auth.service");
const io = require("../utils/socket");

/**
 * A method that gets the Order By its ID
 *
 * @function
 * @author Koodeyo
 * @summary Get a User By ID
 * @param {Object} orderId - The Id of the order
 * @returns {null} if order was not found
 * @returns {Document} if a order was found
 */

const getOrderById = async (orderId) => {
  const order = await Order.findById(orderId);
  return order;
};

/**
 * Get order with `orderData`
 *
 * @function
 * @public
 * @async
 * @author Koodeyo
 * @param {Object} orderData - User data to find with
 * @summary Get order with `orderData`
 * @returns {Document} `order` with the given `orderData`
 */
const getOrder = async (orderData) => {
  const order = await Order.findOne(orderData);
  return order;
};

const deleteOrder = async (orderId) => {
  const order = await Order.findByIdAndRemove(orderId);
  return order;
};

const deleteDeliveryOrder = async (orderId) => {
  const order = await Delivery.findByIdAndRemove(orderId);
  return order;
};

const approveOrder = async (orderId) => {

  const order = await Order.findByIdAndUpdate(orderId, {
    status: "APPROVED",
  });
  console.log(order, "wwwwwwwwwwwwwwwwwwwwwwww");

  await Notify.create({
    user: order.userId,
    order: order._id,
    status: "APPROVED",
  })
    .then((doc) => {
      io.getIO().emit("test", {
        order: order._id,
        user: order.user,
        status: doc.status,
        confirmedAt: doc.confirmedAt,
      });
    })
    .catch((e) => {
      console.log(e);
    });

  return order;
};

const approveDeliveryOrder = async (orderId) => {
  const order = await Delivery.findByIdAndUpdate(orderId, {
    status: "APPROVED",
    confirmedAt: new Date(),
  });

  console.log("orderToApprove", order);
  await Notify.create({
    user: order.user,
    order: order._id,
    status: "APPROVED",
  })
    .then((doc) => {
      io.getIO().emit("test", {
        order: order._id,
        user: order.user,
        status: doc.status,
        confirmedAt: doc.confirmedAt,
      });
    })
    .catch((e) => {
      console.log(e);
    });

  return order;
};
module.exports = {
  deleteOrder,
  approveDeliveryOrder,
  deleteDeliveryOrder,
  getOrderById,
  getOrder,
  approveOrder,
};
