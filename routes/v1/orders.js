const express = require("express");
const router = express.Router();
const { ordersController } = require("../../controllers");

router
  .route("/:id")
  .delete(ordersController.deleteOrder)
  .patch(ordersController.confirmOrder);

module.exports = router;
