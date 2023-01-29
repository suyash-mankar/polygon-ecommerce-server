require("dotenv").config();
const express = require("express");
var cors = require("cors");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const fileUpload = require("express-fileupload");
const app = express();
const port = 8000;
const bodyParser = require("body-parser");
const cloudinary = require("cloudinary");
const db = require("./config/mongoose");
const session = require("express-session");

app.use(cookieParser());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const corsOptions = {
  origin: true, //included origin as true
  credentials: true, //included credentials as true
};

app.use(cors(corsOptions));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(express.json({ limit: "50mb" }));
app.use("/uploads", express.static(__dirname + "/uploads"));

// use routes
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log("error", err);
  }
  console.log("express server is up and running on port", port);
});
