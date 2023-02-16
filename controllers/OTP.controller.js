const AppError = require("../utils/AppError");
const axios = require("axios");
const xtend = require("xtend");

exports.verifyOTP = async (req, res, next) => {
  axios({
    method: "post",
    url: `${req.body.url}?solution=${req.body.code}`,
  })
    .then((response) => {
      console.log(response.data, "data for verified otp");
      // res.send(200);
      req.respond = response;
      next();

      // process.env.NODE_ENV !== "production"
      //   ? console.log(process.env.DEV_URL)
      //   : console.log(process.env.PROD_URL);
      // res.send(response.data);
    })
    .catch((e) => {
      res.status(500).send("something blew up,Invalid otp");
      console.log("smthg went wrongest");
    });
};

exports.next = (req, res) => {
  console.log(res, "response..");
  console.log(
    response.data,
    "next function>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
  );

  res.send(200);
};
