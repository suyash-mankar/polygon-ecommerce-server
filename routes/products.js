const express = require("express");
const router = express.Router();

const productsController = require("../controllers/products_controller");

router.get("/all", productsController.getAllProducts);

module.exports = router;
