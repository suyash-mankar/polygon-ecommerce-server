const Product = require("../models/product");

module.exports.getAllProducts = async function (req, res) {
  try {
    let products = await Product.find({});
    return res.status(200).json({ products: products, status: "success" });
  } catch (err) {
    console.log(err);
    return;
  }
};
