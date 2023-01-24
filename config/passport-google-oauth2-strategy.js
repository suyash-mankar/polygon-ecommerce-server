// const passport = require("passport");
// const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
// const crypto = require("crypto");
// const Customer = require("../models/customer");
// const env = require("./environment");

// // tell passport to use a new Strategy for google login
// passport.use(
//   new googleStrategy(
//     {
//       clientID: env.google_client_id,
//       clientSecret: env.google_client_secret,
//       callbackURL: env.google_callback_url,
//     },

//     function (accessToken, refreshToken, profile, done) {
//       // find a user
//       Customer.findOne({ email: profile.emails[0].value }).exec(function (
//         err,
//         customer
//       ) {
//         if (err) {
//           console.log("Error in google strategy passport", err);
//           return;
//         }

//         if (customer) {
//           // if found, set this user as req.user
//           return done(null, user);
//         } else {
//           // if not found , create the user and set it as req.user
//           return Customer.create(
//             {
//               name: profile.displayName,
//               email: profile.emails[0].value,
//               password: crypto.randomBytes(20).toString("hex"),
//             },
//             function (err, customer) {
//               if (err) {
//                 console.log(
//                   "Error in creating user (google strategy passport)",
//                   err
//                 );
//                 return;
//               }

//               return done(null, customer);
//             }
//           );
//         }
//       });
//     }
//   )
// );

// module.exports = passport;
