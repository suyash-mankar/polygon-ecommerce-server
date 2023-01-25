const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const adminController = require("../controllers/admin_controller");

router.post(
  "/products/create",
  upload.single("image"),
  adminController.createProduct
);

module.exports = router;
