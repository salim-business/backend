const fs = require("fs");
const AppError = require("../utils/AppError");
const { gfsService } = require("../services");
const xtend = require("xtend");
const sharp = require('sharp')
const os = require("os");
const {error} = require('../logger')


exports.upload = async (req, res, next) => {
  console.log(req.file, ">>>>>>>>>>>>>>>>>");
  const tmpdir = "/tmp/new.jpg"

  new Promise((resolve,reject)=>{
  sharp(req.file.path).jpeg({quality: 70}).withMetadata().toFile(`${tmpdir}`, (err, info) => { info ? resolve(xtend(req.file, {path: tmpdir})): reject(err)});

  }).then((info)=>{
    gfsService
    .upload(info, req.body)
    .then((metadata) => {
      fs.unlinkSync(req.file.path);

      if (req.query.middleware) {
        req.body = xtend(metadata, req.body);
        return next();
      }

      return res.json(metadata);
    })
    .catch((e) => {
      next(new AppError("Failed to upload to gfs!"));
    });
  }).catch((err)=>{
    error(err, 'Failed to Upload to gfs, sharp error')
  })

  

  // return gfsService
  //   .upload(req.file, req.body)
  //   .then((metadata) => {
  //     fs.unlinkSync(req.file.path);

  //     if (req.query.middleware) {
  //       req.body = xtend(metadata, req.body);
  //       return next();
  //     }

  //     return res.json(metadata);
  //   })
  //   .catch((e) => {
  //     next(new AppError("Failed to upload to gfs!"));
  //   });
};

exports.uploads = async (req, res) => {
  let uploads = await gfsService.getUploads(req.query);
  res.json(uploads);
};

exports.stream = async (req, res) => {
  // console.log(req.params);
  let file = await gfsService.getStream(req.params.fileName); // uncomment later on
  // let file = await gfsService.getStream(req.params.)
  // console.log(file, "im the file")
  if(file){ 
    res.contentType(file.mimetype);
    file.stream.pipe(res);
    res.status(200);
  } else return res.status(404)
 
};

exports.delete = async (req, res) => {
  let deleted = await gfsService.delete(req.params.id);
  res.json(deleted);
};
