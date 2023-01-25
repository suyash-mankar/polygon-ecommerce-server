const mongoose = require("mongoose");

const multer = require("multer");
const path = require("path");
const AVATAR_PATH = path.join("/uploads/users/avatars");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    qty: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    creator: {
      type: String,
      required: true,
    },
    collectionName: {
      type: String,
      required: true,
    },
    chain: {
      type: String,
      required: true,
    },
  },
  {
    //created at and updated at what time/date
    timestamps: true,
  }
);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", AVATAR_PATH));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

// static methods
productSchema.statics.uploadedAvatar = multer({ storage: storage }).single(
  "avatar"
);
productSchema.statics.avatarPath = AVATAR_PATH;

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
