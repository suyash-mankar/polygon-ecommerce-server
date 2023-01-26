require("dotenv").config();
const express = require("express");
const env = require("./config/environment");
var cors = require("cors");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const app = express();
const port = 8000;
const bodyParser = require("body-parser");
const cloudinary = require("cloudinary");
const db = require("./config/mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(cors());

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());
app.use(express.json({ limit: "50mb" }));
app.use("/uploads", express.static(__dirname + "/uploads"));

// mongo store is used to store the session cookie in the DB
app.use(
  session({
    // cookie name
    name: "codeial",
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create(
      {
        mongoUrl: "mongodb://localhost/codeial_development",
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || "connect-mongodb setup ok");
      }
    ),

    cookie: {
      //in miliseconds
      maxAge: 1000 * 60 * 100,
    },
  })
);

// use routes
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log("error", err);
  }
  console.log("express server is up and running on port", port);
});
