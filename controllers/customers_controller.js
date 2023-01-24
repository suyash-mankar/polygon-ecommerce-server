const Customer = require("../models/customer");

// get the sign up data
module.exports.createCustomer = async function (req, res) {
  try {
    let customer = await Customer.findOne({ email: req.body.email });

    if (!customer) {
      let newCustomer = await Customer.create(req.body);
      return res.status(200).json({ customer: newCustomer, status: "success" });
    } else {
      return res
        .status(200)
        .json({ message: "user already present", status: "success" });
    }
  } catch (err) {
    console.log(err);
    return;
  }
};
