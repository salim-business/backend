const { Attachment, Banners } = require("../models");

exports.add = async function (data) {
  return await Attachment.create(data);
};

exports.get = async function (query) {
  return await Attachment.find(query);
};

exports.getOne = async function (uuid) {
  console.log(uuid, "uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu");
  return await Attachment.findOne({ uuid: uuid });
};

exports.delete = async function (query) {

await Attachment.findByIdAndDelete(query)
return query
};

exports.deleteBanner = async function (query) {
  return await Banners.findOneAndDelete({ uuid: query });
};
