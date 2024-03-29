const express = require("express");
const authMiddleware = require("../../middlewares/auth");
const catchAsync = require("../../utils/catchAsync");
const browseRoute = require("./browse.route");
const searchRoute = require("./search.route");
const authRoute = require("./auth.route");
const statsRoute = require("./statistics.route");
const attachmentRoute = require("./attachment.route");
const meRoute = require("./me.route");
const ordersRoute = require("./orders");
const driversRoute = require("./drivers");
const placesRoute = require("./places");
const usersRoute = require("./users");
// const uploadRoute = require("./banners");
const deliveryRoute = require("./delivery");
const webhookRoute = require("./webhook");
const OTProute = require("./verifyOTP");
const hookResponse = require("./verify.payments");
const redirectRoute = require("./redirect");
const gfsRoute = require("./gfs.route");
const productsRoute = require("./products");
const gridProductsRoute = require("./gridProducts");
const bannersRoute = require("./banners.route");
const picsRoute = require("./pics");
const igcRoute = require("./igc");
const uploadRoute = require("./upload");

const router = express.Router();

router.use("/auth", authRoute);
router.use("/attachment", attachmentRoute);
// router.use(catchAsync(authMiddlewares.authenticate));
router.use("/me", meRoute);

router.use("/browse", browseRoute);
router.use("/search", searchRoute);
router.use("/statistics", statsRoute);
router.use("/orders", ordersRoute);
router.use("/drivers", driversRoute);
router.use("/places", placesRoute);
router.use("/delivery", deliveryRoute);
router.use("/users", usersRoute);
// router.use("/upload", uploadRoute);
router.use("/verifyOTP", OTProute);
router.use("/webhook", webhookRoute);
router.use("/hookresponse", hookResponse);
router.use("/redirect", redirectRoute);
router.use("/gfsUpload", gfsRoute);
router.use("/products", productsRoute);
router.use("/gridProducts", gridProductsRoute);
router.use("/banners", bannersRoute);
router.use("/pics", picsRoute);
router.use("/", igcRoute);
router.use("/upload", uploadRoute);


module.exports = router;
