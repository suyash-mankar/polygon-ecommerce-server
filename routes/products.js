const express = require("express");
const router = express.Router();

const productsController = require("../controllers/products_controller");

router.get("/all", productsController.getAllProducts);
router.post("/create", productsController.createProduct);
router.put("/:id", productsController.updateProduct);
router.delete("/:id", productsController.deleteProduct);
router.get("/:id", productsController.getProductDetails);

module.exports = router;
