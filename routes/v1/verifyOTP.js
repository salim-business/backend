const express = require("express");
const router = express.Router();
const { OTPController } = require("../../controllers");
const { Order, Collections } = require("../../models");
const axios = require("axios");
const moment = require("moment-timezone");

router.route("/").post(OTPController.verifyOTP, function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  // console.log(req.body, "the response will be sent by the next function ...");
  // console.log(req.respond.data, "data");
  console.log("verifyOTP route code..");
  function wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
      end = new Date().getTime();
    }
  }

  let KEY;
  process.env.NODE_ENV !== "production"
    ? (KEY = process.env.FLUTTER_SEC_DEV)
    : (KEY = process.env.FLUTTER_SEC_KEY);
  // (KEY = process.env.FLUTTER_SEC_KEY);

  console.log(KEY), "key";

  // your callback gets executed automatically once the data is received
  function callback(data, error) {
    // consume data

    console.log(data, "api response..");
    if (error) {
      console.error(error, "errr in callback");
      return;
    }
    // console.log(data);
  }

  // run the request. this function will call itself max. 5 times if the request fails

  function request(retries, callback) {
    axios({
      method: "GET",
      url: `https://api.flutterwave.com/v3/transactions/${req.respond.data.data.id}/verify`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${KEY}`,
      },
    })
      .then(async (response) => {
        // request successful

        console.log(
          response.data.data.status,
          "the Status>>>>>>>>>>>>>>>>>>>>>>>>>>>>> response"
        );

        if (response.data.data.status === "successful") {
          // server done, deliver data to script to consume

          callback(response.data.data);

          //   console.log(response.data.data, "axios");
          await Order.findOneAndUpdate(
            { uuid: req.respond.data.data.txRef },
            { payment: response.data.data.status },
            { new: true },
            async (err, order) => {
              console.log(order, "updated order");
              //   res.send(order);

              if (order) {
                await Collections.create({
                  tx_ref: order.uuid,
                  userId: order.user,
                  cost: order.cost,
                  status: order.payment,
                });
                res.send({
                  ...order._doc,
                  // createdAt: moment(order.createdAt)
                  //   .tz("Africa/Kampala")
                  //   .format("MMMM Do, h:mm a"),
                });
              } else {
                console.log(err, "failed to update order to db");
                await Collections.create({
                  tx_ref: order.uuid,
                  userId: order.user,
                  cost: order.cost,
                  status: order.payment,
                });
              }
            }
          ).clone();
        } else {
          // server not done yet
          // retry, if any retries left
          wait(10000);
          if (retries > 0) {
            request(--retries, callback);
          } else {
            // no retries left, calling callback with error
            callback([], "out of retries");
            res.send({ status: "payment failed" });
          }
        }
      })
      .catch((error) => {
        // ajax error occurred
        // would be better to not retry on 404, 500 and other unrecoverable HTTP errors
        // retry, if any retries left

        console.log(
          error.data,
          "response error................................"
        );
        if (retries > 0) {
          request(--retries, callback);
        } else {
          // no retries left, calling callback with error
          callback([], error);
        }
      });
  }

  // wait(15000);

  request(10, callback);

  //   request();

  //   axios({
  //     method: "GET",
  //     url: `https://api.flutterwave.com/v3/transactions/${req.respond.data.data.id}/verify`,
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${KEY}`,
  //     },
  //   })
  //     .then(async (response) => {
  //       console.log(response.data.data, "axios");
  //       await Order.findOneAndUpdate(
  //         { uuid: req.respond.data.data.txRef },
  //         { payment: response.data.data.status },
  //         { new: true },
  //         (err, order) => {
  //           console.log(order, "updated order");
  //           //   res.send(order);

  //           if (order) {
  //             res.send({
  //               ...order._doc,
  //               createdAt: moment(order.createdAt)
  //                 .tz("Africa/Kampala")
  //                 .format("MMMM Do, h:mm a"),
  //             });
  //           } else console.log(err, "failed to update order to db");
  //         }
  //       );
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });

  console.log(req.respond.data.data.txRef, "order reference");
});

module.exports = router;
