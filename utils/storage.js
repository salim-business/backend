const keys = require("../utils/keys");
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const tend = require("xtend");
const { parseISO, addSeconds } = require("date-fns");
const Products = require("../models/products")

console.log(keys.aws)
const s3Client = new S3Client({
  credentials: {
    accessKeyId: keys.aws.accessKeyId,
    secretAccessKey: keys.aws.secretAccessKey,
  },
  region: keys.aws.region,
});

const check = (signedUrl) => {
  const params = new Proxy(new URLSearchParams(signedUrl), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

  const creationDate = parseISO(params["X-Amz-Date"]);
  const expiresInSecs = Number(params["X-Amz-Expires"]);

  const expiryDate = addSeconds(creationDate, expiresInSecs);

  // console.log(creationDate, expiryDate, 'Datess')
  const isExpired = expiryDate < new Date();
  // console.log(isExpired, 'epired')
  return isExpired;
};

const checkSignedUrls = async (products) => {
  for (let product = 0; product < products.length; product++) {
    const expired = check(products[product].imageUrls[0]);
    console.log(expired, "epired");
    if (expired) {
      console.log("Url epired");
      return await getObjectSignedUrls(products);
    }
  }
  return products;
};

async function getObjectSignedUrl(key) {
  const params = {
    Bucket: keys.aws.bucketName,
    Key: key,
  };

  // https://aws.amazon.com/blogs/developer/generate-presigned-url-modular-aws-sdk-javascript/
  const command = new GetObjectCommand(params);

  const seconds = 604800; // 7 days
  // const seconds = 120; // 7 days
  const url = await getSignedUrl(s3Client, command, { expiresIn: seconds });

  return url;
}

async function getObjectSignedUrls(products) {
  const productN = [];
  for (let i = 0; i < products.length; i++) {
    let urls = [];

    for (let n = 0; n < products[i].imgIds.length; n++) {
      const params = {
        Bucket: keys.aws.bucketName,
        Key: products[i].imgIds[n],
      };
      const seconds = 604800; // 7 days
      // https://aws.amazon.com/blogs/developer/generate-presigned-url-modular-aws-sdk-javascript/
      const command = new GetObjectCommand(params);
      const url = await getSignedUrl(s3Client, command, { expiresIn: seconds });

      urls.push(url);
    }
    await Products.findOneAndUpdate(
      { _id: products[i]._doc._id },
      { $set: { imageUrls: [] } }
    );
    await Products.findOneAndUpdate(
      { _id: products[i]._doc._id },
      { $addToSet: { imageUrls: { $each: urls } } }
    );
    const imgProducts = tend(products[i]._doc, { imageUrls: urls });
    imgProducts.imageUrl = urls[0];

    productN.push(imgProducts);
  }

  return productN;
}

const s3Upload = async (images) => {
  let imageKeys = [];
  let imageKey = "";
  let imageUrls = [];

  if (images.length > 0) {
    for (let i = 0; i < images.length; i++) {
      const params = {
        Bucket: keys.aws.bucketName,
        Key: images[i].name,
        Body: Buffer.from(images[i].thumbUrl.split(",")[1], "base64"),
        ContentType: images[i].type,
        // ACL: 'public-read'
      };
      // const upload = await s3Client.send(new PutObjectCommand(params));
      // const url = await getObjectSignedUrl(images[i].name)
      // console.log(images[i].name, "name");
      // imageUrls.push(url);
      imageKeys.push(images[i].name);
    }
    imageKey = imageKeys[0];
  } else {
    const params = {
      Bucket: keys.aws.bucketName,
      Key: images.name,
      Body: Buffer.from(images[i].thumbUrl.split(",")[1], "base64"),
      ContentType: images[0].type,
      // ACL: 'public-read'
    };
    // const upload = await s3Client.send(new PutObjectCommand(params));
    // const url = await getObjectSignedUrl(images[i].name);
    // imageUrls.push(url);
    imageKeys.push(images.name);
    imageKey = images.name;
  }

  return { imageKeys, imageKey, imageUrls };
};

const s3UploadSingle = async (image) => {
  const params = {
    Bucket: keys.aws.bucketName,
    Key: image.originalname,
    Body: image.buffer,
    ContentType: image.mimetype,
    // ACL: 'public-read'
  };

  let upload = await s3Client.send(new PutObjectCommand(params));
  let url = await getObjectSignedUrl(image.originalname);

  return url;
};

const deleteUpload = async (imageKeys) => {
  for (let index = 0; index < imageKeys.length; index++) {
    const imageKey = imageKeys[index];
    console.log(imageKey)
    const deleted = await s3Client.send(new DeleteObjectCommand({
      Bucket: keys.aws.bucketName,
      Key: imageKey,
    }))

    console.log(deleted, 'deleted')
  }

  return true
};

const deleteSingleUpload = async (imageKey) => {
  // for (let index = 0; index < imageKeys.length; index++) {
  //   const imageKey = imageKeys[index];
  //   console.log(imageKey)
    const deleted = await s3Client.send(new DeleteObjectCommand({
      Bucket: keys.aws.bucketName,
      Key: imageKey,
    }))

  //   console.log(deleted, 'deleted')
  // }

  return true
};

module.exports = {
  getObjectSignedUrl,
  s3Upload,
  getObjectSignedUrls,
  checkSignedUrls,
  s3UploadSingle,
  deleteUpload, deleteSingleUpload
};
