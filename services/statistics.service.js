const { User, Order, Collections } = require("../models");

exports.monthly = async function (query) {
  let users = await User.countPerMonth(query);
  let orders = await Order.countPerMonth(query);
  let collections = await Collections.countPerMonth(query);

  return { users, orders, collections };
};

exports.all = async function (query) {
  let users = await User.countDocuments(query);
  let orders = await Order.countDocuments(query);
  let collections = await Collections.count({ status: "successful" });
  let totalCollections = await Collections.aggregate([
    { $match: { status: "successful" } },
    { $group: { _id: "$status", cost: { $sum: "$cost" } } },
  ]);

  return { users, orders, collections, totalCollections };
};
