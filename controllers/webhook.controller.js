const axios = require("axios");

// const SEC_KEY = "FLWSECK-8c210fb77ea11c460271faae1c705691-X";

exports.post = (req, res) => {
  //   console.log(request, "hook request post");
  console.log(req.body, "webhookk body post");
  /* It is a good idea to log all events received. Add code *
   * here to log the signature and body to db or file       */

  // retrieve the signature from the header
  var hash = req.headers["verif-hash"];
  console.log(hash, "hash");

  if (!hash) {
    // discard the request,only a post with the right Flutterwave signature header gets our attention
  }

  // Get signature stored as env variable on your server
  // const secret_hash = process.env.MY_HASH;
  const secret_hash = "koodeyo";

  // check if signatures match

  if (hash !== secret_hash) {
    console.log("secret & hash  dont match");
    // silently exit, or check that you are passing the right hash on your server.
  }
  // const secret_hash = process.env.MY_HASH;

  // Retrieve the request's body
  //   var request_json = JSON.parse(req.body);
  console.log("almost there.... hook");
  // process.env.NODE_ENV !== "production"
  //   ? process.env.DEV_URL
  //   : process.env.PROD_URL;

  axios({
    method: "post",
    url:
      process.env.NODE_ENV !== "production"
        ? `${process.env.DEV_URL}/hookresponse`
        : `${process.env.PROD_URL}/hookresponse`,
    data: req.body,
  }).catch((e) => {
    console.log(e, "hookError");
  });
  // console.log(request_json, "current transaction status");
  // Give value to your customer but don't give any output
  // Remember that this is a call from rave's servers and
  // Your customer is not seeing the response here at all

  res.send(200);
};

exports.get = async (req, res, next) => {
  console.log(req.body, "webhook get...body");
  res.send({
    get: "webhook get",
  });
};
