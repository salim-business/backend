const clients = require("restify-clients");
// Creates a JSON client
var client = clients.createJsonClient({
  url: "https://sms.koodeyo.com/api/v1",
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
      console.log(err);
      cb(obj);
    }
  );
};
// "http://192.168.0.100:5000/api/v1"
// ("https://softphone-api.cloud.koodeyo.com/api/v1");
