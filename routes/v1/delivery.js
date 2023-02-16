const express = require("express");
const router = express.Router();
const { ordersController } = require("../../controllers");

router
  .route("/:id")
  .delete(ordersController.deleteDeliveryOrder)
  .patch(ordersController.confirmDeliveryOrder);

module.exports = router;
