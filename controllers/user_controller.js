const User = require("../models/User");

module.exports.registerUser = async function (req, res) {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      user = await User.create(req.body);
      return res.status(200).json({ user: newUser, status: "success" });
    } else {
      return res.status(200).json({ user, success: true });
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
