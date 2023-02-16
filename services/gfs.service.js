/**
 * see https://github.com/sametsahindogan/static-file-server/blob/master/services/FileService.js
 * for more
 */

const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const uuid = require("uuid");
const xtend = require("xtend");
const { Attachment, Banners } = require("../models");


class FileService {
  constructor() {
    this.bucket = new mongoose.mongo.GridFSBucket(mongoose.connection, {
      bucketName: "uploads",
    });
  }

  upload(file, data) {
    return new Promise((resolve, reject) => {
      // let extension = path.extname(file.originalname).substr(1);
      let id = uuid.v4();
      // let fileName = `${id}.${extension}`;
      let fileName = `${id}`;

      new Attachment({
        uuid: id,
        name: file.originalname,
      }).save((err, doc) => {
        // doc ? console.log(doc) : console.log(err);

        // console.log(doc, "attachement _ids");

        if (doc) {
          let metadata = xtend(data, {
            mime_type: file.mimetype,
            // extension,
            original_name: file.originalname,
          });

          const attachment_id = doc._id.valueOf();

          let stream = this.bucket.openUploadStream(attachment_id, {
            metadata,
          });

          // console.log(stream, stream.id, attachment_id, stream._id,"sttttttttttttereeeeeeeeeeeeeee")

          let response = xtend(metadata, {

            filename: attachment_id,
            streamId: stream.id,
            attachmentId: doc._doc,
          });

          fs.createReadStream(file.path)
            .pipe(stream)
            .on("end", () => resolve(response))
            .on("close", () => resolve(response))
            .on("error", reject);
        }
      });
    });
  }

  async getStream(attachment_id) {
    let files = await this.bucket
      .find({ filename: attachment_id }, { limit: 1 })
      .toArray();

    let file = files[0];

    // console.log(file, "filleeee")

    if(file) return {
      filename: file.filename,
      // extension: file.metadata.extension,
      mimetype: file.metadata.mime_type,
      stream: this.bucket.openDownloadStream(file._id),
    };

    return null
  }

  async getUploadsByOwner(owner) {
    return await this.bucket
      .find({
        "metadata.owner": owner,
      })
      .toArray();
  }

  async getUploads(query) {
    return await this.bucket.find(query).toArray();
  }

  async deleteOne(query) {
    await this.bucket.s._filesCollection.deleteOne(query);
  }

  async delete(stream) {

     this.bucket.s._filesCollection.deleteOne(
      { _id: mongoose.Types.ObjectId(stream)},
      (error, res) => {
        return this.bucket.s._chunksCollection.deleteMany(
          { files_id: mongoose.Types.ObjectId(stream) },
          (error) => {}
        );
      }
    );

    return stream
  }
}

module.exports = new FileService();
