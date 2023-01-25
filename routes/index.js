const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home_controller");

router.get("/", homeController.home);
router.use("/customers", require("./customers"));
router.use("/admin", require("./admin"));
router.use("/products", require("./products"));

module.exports = router;
