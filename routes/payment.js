const express = require("express");
const router = express.Router();

const { isAuthenticatedUser } = require("../middleware/auth");

const paymentController = require("../controllers/payment_controller");

router.post("/process", isAuthenticatedUser, paymentController.processPayment);
router.GET(
  "/stripeapikey",
  isAuthenticatedUser,
  paymentController.sendStripeApiKey
);

module.exports = router;
