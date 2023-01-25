const express = require("express");
const router = express.Router();
const passport = require("passport");

const customersController = require("../controllers/customers_controller");

router.post("/create", customersController.createCustomer);
router.post(
  "/create-session",
  passport.authenticate("local", {
    failureRedirect: "http://localhost:3000/customer/login",
  }),
  customersController.createSession
);

router.post("/addtocart", customersController.addProductToCart);

module.exports = router;
