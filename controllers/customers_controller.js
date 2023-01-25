const Customer = require("../models/customer");
const AddToCart = require("../models/addToCart");

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

module.exports.createSession = function (req, res) {
  console.log("success", "Logged in Successfully");

  return res
    .status(200)
    .json({ message: "customer logged in successfully", status: "success" });
};

module.exports.addProductToCart = async function (req, res) {
  try {
    return res.status(200).json({ products: "products", status: "success" });
  } catch (err) {
    return res.redirect("back");
  }
};
