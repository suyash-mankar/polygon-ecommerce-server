const express = require("express");
const router = express.Router();

const { isAuthenticatedUser } = require("../middleware/auth");

const paymentController = require("../controllers/payment_controller");

router.post("/process", isAuthenticatedUser, paymentController.processPayment);
router.get(
  "/stripeapikey",
  isAuthenticatedUser,
  paymentController.sendStripeApiKey
);

router.post(
  "/create-checkout-session",
  isAuthenticatedUser,
  paymentController.createCheckoutSession
);

module.exports = router;
