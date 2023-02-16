const { Driver } = require("../models");

const createDriver = async (userData) => {
  if (userData.id) {
    return await Driver.updateOne({ _id: userData.id }, userData);
  } else {
    return await Driver.create(userData);
  }
};

const deleteDriver = async (driverId) => {
  const driver = await Driver.findByIdAndRemove(driverId);
  return driver;
};

module.exports = {
  deleteDriver,
  createDriver,
};
