const express = require("express");
const router = express.Router();
const { verifyController, paymentsController } = require("../../controllers");

router.route("/").post(verifyController.verify).get(verifyController.verifyGet);
// .delete(ordersController.deleteDeliveryOrder)
// .patch(ordersController.confirmDeliveryOrder);

module.exports = router;
