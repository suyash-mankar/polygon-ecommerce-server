const Product = require("../models/product");
const cloudinary = require("cloudinary");

module.exports.getAllProducts = async function (req, res) {
  try {
    let productsCount = await Product.countDocuments();

    let products = await Product.find({});
    return res.status(200).json({ products, productsCount, success: true });
  } catch (err) {
    console.log(err);
    return;
  }
};

module.exports.createProduct = async function (req, res) {
  try {
    let image = req.body.image;

    let imageLink;
    const result = await cloudinary.v2.uploader.upload(image, {
      folder: "products",
    });

    imageLink = {
      public_id: result.public_id,
      url: result.secure_url,
    };

    req.body.image = imageLink;

    let product = await Product.findOne({ title: req.body.title });

    if (!product) {
      let newProduct = await Product.create(req.body);
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

    // Image Start Here
    let image = req.body.image;

    if (image !== undefined) {
      let imageLink = {};

      // Deleting Images From Cloudinary
      await cloudinary.v2.uploader.destroy(product.image.public_id);

      const result = await cloudinary.v2.uploader.upload(image, {
        folder: "products",
      });

      imageLink = {
        public_id: result.public_id,
        url: result.secure_url,
      };

      req.body.image = imageLink;
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

    // deleting image from cloudinary
    await cloudinary.v2.uploader.destroy(product.image.public_id);

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

// Get all products for admin
module.exports.getAdminProducts = async function (req, res) {
  try {
    let products = await Product.find({});
    return res.status(200).json({ products, success: true });
  } catch (err) {
    console.log(err);
    return;
  }
};
