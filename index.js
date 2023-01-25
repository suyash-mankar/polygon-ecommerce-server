require("dotenv").config();
const express = require("express");
const env = require("./config/environment");
var cors = require("cors");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const app = express();
const port = 8000;

app.use(cors());

const bodyParser = require("body-parser");
const db = require("./config/mongoose");

// Used for session cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
// const passportGoogle = require("./config/passport-google-oauth2-strategy");

const MongoStore = require("connect-mongo");

// use bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

app.use(passport.initialize());
app.use(passport.session());
// app.use(passport.setAuthenticatedUser);

// use routes
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log("error", err);
  }
  console.log("express server is up and running on port", port);
});
