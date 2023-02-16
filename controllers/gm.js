const fs = require('fs');
const path = require('path');
const http = require('http');

const gm = require('gm').subClass({imageMagick: true}); // https://www.npmjs.com/package/gm

const gmIdentify = gmInstance =>
  new Promise((resolve, reject) => {
    gmInstance.identify((err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  });

const gmStream = (gmInstance, writeStream, format = 'jpg') =>
  new Promise((resolve, reject) => {
    gmInstance
      .stream(format)
      .pipe(writeStream)
      .once('finish', resolve)
      .once('error', reject);
  });

// This function downloads the file from the specified `url` and writes it to
// the passed `writeStream`.
const fetchFile = (url, writeStream) =>
  new Promise((resolve, reject) => {
    http.get(url, res => {
      if (res.statusCode !== 200) {
        reject(new Error('Something went wrong!'));
        return;
      }

      res
        .pipe(writeStream)
        .once('finish', () => {
          resolve();
        })
        .once('error', err => {
          reject(err);
        });
    });
  });

const main = async () => {
  // Download a sample non-progressive JPEG image from the internet
  const originalJpegUrl =
    'http://localhost:3000/DSC01226.jpg';
  const originalPath = path.join(__dirname, './original.jpeg');
  await fetchFile(originalJpegUrl, fs.createWriteStream(originalPath));
  originalJpegData = await gmIdentify(gm(fs.createReadStream(originalPath)));
  console.log(
    `Interlace for the original jpeg file is set to ${
      originalJpegData['Interlace']
    }`,
  );

  // Convert the downloaded file to Progressive-JPEG
  const progressiveJpegPath = path.join(__dirname, '../public/gm.jpg');
  await gmStream(
    gm(fs.createReadStream(originalPath))
      .interlace('line' /* or 'plane' */) // https://www.imagemagick.org/MagickStudio/Interlace.html
      .quality(originalJpegData['JPEG-Quality']), // save with the same quality as the original file
    fs.createWriteStream(progressiveJpegPath),
  );
  const progressiveJpegData = await gmIdentify(
    gm(fs.createReadStream(progressiveJpegPath)),
  );
  console.log(
    `Interlace for the converted jpeg file is set to ${
      progressiveJpegData['Interlace']
    }`,
  );
};

main();