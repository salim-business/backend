const clients = require("restify-clients");
// Creates a JSON client
var client = clients.createJsonClient({
  url: "https://softphone-api.cloud.koodeyo.com/api/v1", // you need to change the route
  appendPath: true,
  headers: {
    apiKey: "4y767Y15ykMSpN3aVpFLXT",
  },
});

module.exports = function (to, message, cb) {
  client.post(
    "sms",
    {
      to,
      message,
    },
    function (err, req, res, obj) {
      cb(obj);
    }
  );
};
// "http://192.168.0.100:5000/api/v1"
// "http://softphone.koodeyo.com/api/v1"
//  url: "http://192.168.0.100:5000/api/v1", // you need to change the route
