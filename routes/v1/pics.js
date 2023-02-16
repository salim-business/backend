const express = require("express");
const router = express.Router();
// const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
// const image = require("./DSC00497-2.jpg");

router.route("/:width/:id").get((req, res) => {
  console.log(req.params);
  fs.readFile(
    `/home/geophrey/Documents/igc-backend/public/pics/${req.params.id}`,
    function (err, data) {
      if (err) {
        throw err;
      } // Fail if the file can't be read.
      const buffer = Buffer.from(data.toString());
      // console.log(typeof data, "daaaaaataaaaa");
      res.writeHead(200, { "Content-Type": "image/jpeg" });

      // console.log(data, "data");
      res.end(data); // Send the file data to the browser.
    }
  );
  // const image = fs.readFile("../../public/pics/DSC00497-2.jpg");
  // const promise = fs.promises.readFile(path.join("./DSC00497-2.jpg"));

  // fs.readdirSync("/home/geophrey/Documents/igc-backend/public/pics").forEach(
  //   (file) => {
  //     // console.log(file);

  //     sharp(`/home/geophrey/Documents/igc-backend/public/pics/${file}`)
  //       .resize(null, null, { fit: "contain" })
  //       .toFile(
  //         `/home/geophrey/Documents/igc-backend/public/compressed/${file}`,
  //         (err, info) => {
  //           console.log(err, "e");
  //           // console.log(info, "i");
  //         }
  //       );
  //   }
  // );

  return;

  let promise = new Promise((resolve, reject) => {
    resolve(
      sharp("/home/geophrey/Documents/igc-backend/public/pics/DSC01077.jpg")
        .resize(Number(req.params.width), null, { fit: "contain" })
        .toFile(
          "/home/geophrey/Documents/igc-backend/public/pics/hover/output.jpg",
          (err, info) => {
            console.log(err, "e");
            // console.log(info, "i");
          }
        )
    );
  });

  promise.then((e) => {
    console.log(e.options.fileOut, "resolves");
    setTimeout(() => {
      fs.readFile(e.options.fileOut, function (err, data) {
        if (err) {
          throw err;
        } // Fail if the file can't be read.
        const buffer = Buffer.from(data.toString());
        // console.log(typeof data, "daaaaaataaaaa");
        res.writeHead(200, { "Content-Type": "image/jpeg" });

        // console.log(data, "data");
        res.end(data); // Send the file data to the browser.
      });
    }, 5000);
  });
});

module.exports = router;
