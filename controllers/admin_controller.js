const Product = require("../models/product");

// get the sign up data
module.exports.createProduct = async function (req, res) {
  try {
    console.log(req.file);
    console.log(req.body);
    let imageUrl = req.file.path;
    let product = await Product.findOne({ title: req.body.title });

    if (!product) {
      let newProduct = await Product.create({ ...req.body, image: imageUrl });
      return res.status(200).json({ product: newProduct, status: "success" });
    } else {
      return res
        .status(200)
        .json({ message: "product already present", status: "success" });
    }
  } catch (err) {
    console.log(err);
    return;
  }
};
