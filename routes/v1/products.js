const express = require("express");
const router = express.Router();
const { productsController } = require("../../controllers");

router
  .route("/")
  .post(productsController.addItem)
  .get(productsController.getItem)
  .patch(productsController.addItem);

router.route("/:id").delete(productsController.deleteItem);

module.exports = router;
