const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const YOUR_DOMAIN = "http://localhost:8000";

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

exports.createCheckoutSession = async (req, res) => {
  try {
    const params = {
      submit_type: "pay",
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      line_items: req.body.cartItems.map((item) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.title,
              images: [item.image],
            },
            unit_amount: item.price * 100,
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
          },
          quantity: item.quantity,
        };
      }),
      mode: "payment",
      success_url: `http://localhost:3000/success`,
      cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    };

    const session = await stripe.checkout.sessions.create(params);

    // let totalCartAmount = 0;
    // req.body.cartItems.map((item) => {
    //   totalCartAmount += item.price;
    // });

    // const myPayment = await stripe.paymentIntents.create({
    //   amount: totalCartAmount,
    //   currency: "inr",
    //   metadata: {
    //     company: "NFT-Ecommerce",
    //   },
    // });

    res.status(200).json(session);

    // res.redirect(303, session.url);
  } catch (error) {
    console.log(error);
    return;
  }
};
