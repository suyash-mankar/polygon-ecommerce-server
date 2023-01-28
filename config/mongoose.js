const mongoose = require("mongoose");
mongoose.connect(
  `mongodb+srv://suyashmankar:${process.env.MONGODB_ATLAS_PASS}@cluster0.7o1b7al.mongodb.net/polygon_ecommerce?retryWrites=true&w=majority`
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, " Error connecting to MongoDB"));

db.once("open", function () {
  console.log("Connected to database :: MongoDB");
});

module.exports = db;
