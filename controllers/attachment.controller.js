const fs = require("fs");
const AppError = require("../utils/AppError");
const httpStatus = require("http-status");
const { attachmentService, googleDriveService } = require("../services");
const { Banners } = require("../models");
const xtend = require("xtend");

exports.upload = async (req, res, next) => {
  let file = req.file;
  console.log(req.file);
  // res.json({ success: true });
  console.log("good to go");

  let { data, status } = await googleDriveService.upload({
    // folder: "folder id",s
    fileName: file.originalname,
    mimeType: file.mimetype,
    body: fs.createReadStream(file.path),
  });

  if (status === 200) {
    let attachment = await attachmentService.add(
      xtend(file, req.body, data, {
        name: file.originalname,
      })
    );
    res.json(attachment);
  } else {
    next(
      new AppError(
        "Failed to upload attachment",
        httpStatus.UNSUPPORTED_MEDIA_TYPE
      )
    );
  }

  fs.unlinkSync(file.path);
};

exports.download = async (req, res) => {
  let attachment = await attachmentService.getOne(req.params.id);
  let stream = await googleDriveService.getFileStream(attachment.id);
  res.contentType(attachment.mimetype);
  stream.pipe(res);
};

exports.delete = async (req, res) => {
  let attachment = await attachmentService.delete(req.params.id);
  res.json(attachment);
};

exports.deleteBanner = async (req, res) => {
  // let attachment = await attachmentService.getOne(req.params.id);
  let banner = await attachmentService.getOne(req.params.id);
  // await googleDriveService.deleteFile(attachment.id);
  // console.log(attachment, "attachment");
  await attachmentService.deleteBanner(banner.uuid);
  // await attachmentService.delete(attachment.uuid);

  res.json(banner);
};
