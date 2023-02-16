const clients = require("restify-clients");
// Creates a JSON client
var client = clients.createJsonClient({
  url: "https://softphone-api.cloud.koodeyo.com/api/v1", // you need to change the route
  appendPath: true,
  headers: {
    apiKey: "4y767Y15ykMSpN3aVpFLXT",
  },
});

function sendSms(to, message) {
  client.post(
    "sms",
    {
      to,
      message,
    }
    // function (err, req, res, obj) {
    //   cb(obj);
    // }
  );
  console.log("");
}

const number = [
  "0700339077",
  "0750836228",
  "0706807405",
  "0700856036",
  "0757323884",
  "0780743854",
  "0786742790",
  "0705268027",
  "0775266558",
];

number.forEach((num) => {
  console.log(num);
  sendSms(
    num,
    `Assalam alaikum warahmatullah wabarakatuh. I hereby remind you about the GULU-REC Leadership training that is take place tomorrow 19th/11/21 at Gulu city main masjid.We still need your support however small it might be contribute to 0705709352(BALUKU IBRAHIM)May Allah reward you.For info contact 0704206558/0775266558`
  );
  console.log("done", num);
});

// "http://192.168.0.100:5000/api/v1"
// "http://softphone.koodeyo.com/api/v1"
//  url: "http://192.168.0.100:5000/api/v1", // you need to change the route
