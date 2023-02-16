const express = require("express");
const router = express.Router();
const orderController = require("../../../controllers/client/orders.controller");
const authMiddleWare = require("../../../middlewares/client/auth");

router.route("/").post(authMiddleWare, orderController.makeOrder);
router.route("/paid").post(orderController.paidOrder);
// .get(orderController.getOrders);

// router
//   .route("/:id")
//   .get(orderController.getOrder)
//   .delete(orderController.deleteOrder);

module.exports = router;
