/**
 * see https://github.com/sametsahindogan/static-file-server/blob/master/services/FileService.js
 * for more
 */

const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const uuid = require("uuid");
const xtend = require("xtend");
const { Banners } = require("../models");

class FileService {
  constructor() {
    this.bucket = new mongoose.mongo.GridFSBucket(mongoose.connection, {
      bucketName: "uploads",
    });
  }

  upload(file, data) {
    return new Promise((resolve, reject) => {
      let extension = path.extname(file.originalname).substr(1);
      let id = uuid.v4();
      // let fileName = `${id}.${extension}`;
      let fileName = `${id}`;

      new Banners({
        uuid: id,
        name: file.originalname,
      }).save((err, doc) => {
        doc
          ? console.log(doc, "banner created")
          : console.log(err, "failed to create banner");
      });

      let metadata = xtend(data, {
        mime_type: file.mimetype,
        extension,
        original_name: file.originalname,
      });

      let stream = this.bucket.openUploadStream(fileName, {
        metadata,
      });

      let response = xtend(metadata, { filename: fileName, id: stream.id });

      fs.createReadStream(file.path)
        .pipe(stream)
        .on("end", () => resolve(response))
        .on("close", () => resolve(response))
        .on("error", reject);
    });
  }

  async getStream(path) {
    let files = await this.bucket
      .find(
        {
          filename: path,
          // original_name: path,
        },
        { limit: 1 }
      )
      .toArray();

    let file = files[0];

    return {
      filename: file.filename,
      extension: file.metadata.extension,
      mimetype: file.metadata.mime_type,
      stream: this.bucket.openDownloadStream(file._id),
    };
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

  delete(id) {
    console.log(id, ">>>>>>>>>>>>>>>>>>>>>>>");
    return this.bucket.s._filesCollection.deleteOne(
      { _id: mongoose.Types.ObjectId(id) },
      (error, res) => {
        return this.bucket.s._chunksCollection.deleteMany(
          { files_id: mongoose.Types.ObjectId(id) },
          (error) => {}
        );
      }
    );
  }
}

module.exports = new FileService();
