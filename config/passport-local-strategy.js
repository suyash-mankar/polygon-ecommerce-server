const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;

const Customer = require("../models/customer");

// authentication using passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    function (req, email, password, done) {
      // find a user and establish the identity
      Customer.findOne({ email: email }, function (err, customer) {
        if (err) {
          console.log(err);
          return done(err);
        }

        if (!customer || customer.password != password) {
          console.log("error", "Invalid Username/Password"); // authentication is false/not done
          return done(null, false);
        }

        return done(null, customer);
      });
    }
  )
);

// Serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function (customer, done) {
  done(null, customer.id);
});

// Deserializing the user from the key in the cookies
passport.deserializeUser(function (id, done) {
  Customer.findById(id, function (err, customer) {
    if (err) {
      console.log("Error in finding user --> Passport");
      return done(err);
    }

    return done(null, customer);
  });
});

// check if the user is authenticated
passport.checkAuthentication = function (req, res, next) {
  // if the user is signed in, then pass on the request to the next function(controller's action)
  if (req.isAuthenticated()) {
    return next();
  }

  // if the user is not signed in
  return res
    .status(200)
    .json({ message: "please login first", status: "fail" });
};

passport.setAuthenticatedCustomer = function (req, res, next) {
  if (req.isAuthenticated()) {
    // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
    res.locals.customer = req.customer;
  }
  next();
};

module.exports = passport;
