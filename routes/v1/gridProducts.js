const express = require("express");
const router = express.Router();
const { gridProductsController } = require("../../controllers");

router
  .route("/")
  .post(gridProductsController.addItem)
  .get(gridProductsController.getItem)
  .patch(gridProductsController.editItem);

router.route("/:id").delete(gridProductsController.deleteItem);

module.exports = router;
