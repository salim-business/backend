const User = require("../models");
const AppError = require("../utils/AppError");
const { userService } = require("../services");

exports.addUser = async (req, res, next) => {
  console.log(req.body);

  const user = await new User(req.body);

  user.save(async (err, user) => {
    if (err) {
      console.log(err);

      return next(new AppError(`Failed to create user, ${err}`));
    }

    res.json(user);
  });

  // const newDriver = new OrderModel(req.body);

  // newOrder.save(async (err, record) => {
  //     if (err) {
  //         console.log(err.message);
  //         return next(new Error("Order failed to be saved to db"));
  //     }
  // })
};
exports.deleteUser = async (req, res, next) => {
  console.log(req.params.id);
  let User = await userService.deleteUser(req.params.id);
  res.json(User);
};
