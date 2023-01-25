const express = require("express");
const router = express.Router();

const productsController = require("../controllers/products_controller");
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");

router.get("/all", productsController.getAllProducts);

router.post(
  "/create",
  isAuthenticatedUser,
  authorizedRoles("admin"),
  productsController.createProduct
);

router.put(
  "/:id",
  isAuthenticatedUser,
  authorizedRoles("admin"),
  productsController.updateProduct
);

router.delete(
  "/:id",
  isAuthenticatedUser,
  authorizedRoles("admin"),
  productsController.deleteProduct
);

router.get("/:id", productsController.getProductDetails);

module.exports = router;
