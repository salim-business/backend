const { User } = require("../models");

const deleteUser = async (userId) => {
  const user = await User.findByIdAndRemove(userId);
  return user;
};

module.exports = {
  deleteUser,
};
