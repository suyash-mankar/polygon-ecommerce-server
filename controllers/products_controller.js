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

module.exports.createProduct = async function (req, res) {
  try {
    let imageUrl = req.file.path;
    let product = await Product.findOne({ title: req.body.title });

    if (!product) {
      let newProduct = await Product.create({ ...req.body, image: imageUrl });
      return res.status(200).json({ product: newProduct, status: "success" });
    } else {
      return res
        .status(200)
        .json({ message: "product already present", success: true });
    }
  } catch (err) {
    console.log(err);
    return;
  }
};

module.exports.updateProduct = async function (req, res) {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res
        .status(500)
        .json({ message: "Product not found", success: false });
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    return res.status(200).json({ product, success: true });
  } catch (err) {
    console.log(err);
    return;
  }
};

module.exports.deleteProduct = async function (req, res) {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res
        .status(500)
        .json({ message: "Product not found", success: false });
    }

    await product.remove();

    return res
      .status(200)
      .json({ message: "Product deleted successfully", success: true });
  } catch (err) {
    console.log(err);
    return;
  }
};

module.exports.getProductDetails = async function (req, res) {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res
        .status(500)
        .json({ message: "Product not found", success: false });
    }

    return res.status(200).json({ product, success: true });
  } catch (err) {
    console.log(err);
    return;
  }
};
