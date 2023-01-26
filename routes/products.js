const express = require("express");
const router = express.Router();

const productsController = require("../controllers/products_controller");
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");

router.get("/all", productsController.getAllProducts);
router.get(
  "/admin/all",
  isAuthenticatedUser,
  productsController.getAdminProducts
);

router.post(
  "/admin/create",
  isAuthenticatedUser,
  authorizedRoles("admin"),
  productsController.createProduct
);

router.put(
  "/admin/:id",
  isAuthenticatedUser,
  authorizedRoles("admin"),
  productsController.updateProduct
);

router.delete(
  "/admin/:id",
  isAuthenticatedUser,
  authorizedRoles("admin"),
  productsController.deleteProduct
);

router.get("/:id", productsController.getProductDetails);

module.exports = router;
