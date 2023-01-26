const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.processPayment = async (req, res) => {
  try {
    const myPayment = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "inr",
      metadata: {
        company: "NFT-Ecommerce",
      },
    });
    res
      .status(200)
      .json({ success: true, client_secret: myPayment.client_secret });
  } catch (error) {
    console.log(error);
    return;
  }
};

exports.sendStripeApiKey = async (req, res) => {
  res
    .status(200)
    .json({ success: true, stripeApiKey: process.env.STRIPE_API_KEY });
};
