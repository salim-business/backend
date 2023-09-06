const jwt = require("jsonwebtoken");
const { validationResult, body } = require("express-validator");
const randomize = require("randomatic");
const sendSms = require("../../utils/client/sms");
const Users = require("../../models/user");
const Order = require("../../models/orders");
const constants = require("../../constants");
const moment = require("moment-timezone");

let pendingAuth = new Map();

exports.authenticate = function (req, res, next) {
  console.log(req.body, "starting auth");

  const errors = validationResult(req);
  console.log(errors, "validation errors");
  console.log(req.body);
  if (!errors.isEmpty()) {
    // return res.status(400).json({ errors: errors.array() });
    return res.json({
      errors: errors.array(),
    });
  } else {
    return Users.findOne(
      { phone: req.body.phone, username: req.body.username },
      async (err, user) => {
        if (user) {
          const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
          console.log("user exists", user);
          const ObjectId = require("mongodb").ObjectId;
          const ordersQuery = await Order.find({ userId: ObjectId(user._id) });
          const orders = ordersQuery.map((a) => ({
            ...a._doc,
            createdAt: moment(a._doc.createdAt)
              .tz("Africa/Kampala")
              .format("MMMM Do YYYY"),
          }));
          console.log(orders, "QUUERY");

          res.json({
            message: "Authentication succeeded",
            token,
            orders,
            userInfo: user,
            exist: true,
          });
        } else {
          let data = { ...req.body, code: randomize("0", 4) };

          ///add a piece of code that capitalizes the first letter of the username and make the othe r uniform

          console.log(data.code, "code");
          if (process.env.NODE_ENV !== "production") {
            console.log(data);
            pendingAuth.set("code", data.code);
            pendingAuth.set("userInfo", req.body);
          } else {
            pendingAuth.set("code", data.code);
            pendingAuth.set("userInfo", req.body);
            sendSms(
              data.phone,
              `${data.username}, Your activation code is ${data.code}`,
              function (result) {}
            );
          }

          pendingAuth.set("code", data.code);
          pendingAuth.set("userInfo", req.body);
          //irreleveant block of code you should remove it
          // let pendingAuth = new Map();
          // pendingAuth.set("code", data.code); //The set(key, value) method adds or updates an element with a specified key and a value to a Map object.
          /////////////////////// on second thought i guess its relevant, makes a memory copy of the data, which can be accessed, instance..
          // pendingAuth.set("userInfo", req.body);
          //Uncommtted the code below to enable sending sms
          // sendSms(
          //   data.phone,
          //   `${data.username}, Your activation code is ${data.code}`,
          //   function (result) {}
          // );
          res.json({ data: data });
          console.log("almost there...");
        }
      }
    );
  }

  let data = { ...req.body, code: randomize("0", 5) };

  if (process.env.NODE_ENV !== "production") {
    console.log(data);
  }

  //irreleveant block of code you should remove it
  // let pendingAuth = new Map();

  pendingAuth.set("code", data.code); //The set(key, value) method adds or updates an element with a specified key and a value to a Map object.
  /////////////////////// on second thought i guess its relevant, makes a memory copy of the data, which can be accessed, instance..
  pendingAuth.set("userInfo", req.body);

  //Uncommtted the code below to enable sending sms

  // sendSms(
  //   data.phone,
  //   `${data.username}, Your activation code is ${data.code}`,
  //   function (result) {}
  // );

  res.json({ data: data });

  console.log("almost there...");
};

exports.verify = function (req, res, next) {
  let { phone, code } = req.params;

  let codeInMemory = pendingAuth.get("code");

  function wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
      end = new Date().getTime();
    }
  }

  if (!codeInMemory) {
    console.log("no in memory code");
    return next(
      new Error(
        "Authentication failed, In memory code missing, check pendingAuthMap()"
      )
    );
  }

  if (Number(codeInMemory) === Number(code)) {
    Users.findOne({ phone: phone }, (err, user) => {
      if (user) {
        console.log(user, "user exists");
        var token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
        console.log(token);

        wait(3000);

        res.json({
          message: "Authentication succeeded",
          token,
          userInfo: pendingAuth.get("userInfo"),
        });
        console.log("response sent");
      } else {
        let addUser = new Promise((resolve, reject) => {
          let user = new Users(pendingAuth.get("userInfo"));
          user.save((err, record) => {
            if (err) return reject(err);

            resolve(record);
          });
        });

        addUser
          .then((user) => {
            //handleResolve then
            var token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
            wait(5000);

            res.json({
              message: "Authentication succeeded",
              token,
              userInfo: pendingAuth.get("userInfo"),
            });
            console.log("new user created");
          })
          .catch((err) => {
            //handleReject
            console.log(err);
            console.log(err, "failed to save to db");
          });
      }
    });
  } else {
    wait(5000);
    next(new Error("Invalid code"));
  }
};
