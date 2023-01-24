const express = require("express");
const router = express.Router();
const passport = require("passport");

const customersController = require("../controllers/customers_controller");

router.post("/create", customersController.createCustomer);

module.exports = router;    
