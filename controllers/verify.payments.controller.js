const Driver = require("../models/drivers");
const AppError = require("../utils/AppError");

const { Order } = require("../models");
const moment = require("moment-timezone");

const axios = require("axios");

// const SEC_KEY = "FLWSECK-8c210fb77ea11c460271faae1c705691-X";

exports.verify = (req, res) => {
  console.log(req.body, "hook response");

  Order.findOneAndUpdate(
    { uuid: req.body.txRef },
    { payment: req.body.status },
    { new: true },
    (err, order) => {
      if (order) {
        console.log(order, "paid order sucessfully");
        res.sendStatus(200);
      } else {
        console.log("no order found.. with txRef");
      }
    }
  );
};

exports.verifyGet = async (req, res, next) => {
  console.log(req.body, "post");
};
