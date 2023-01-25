const express = require("express");
const router = express.Router();
const passport = require("passport");

const userController = require("../controllers/user_controller");

router.post("/register", userController.registerUser);



router.post(
  "/create-session",
  passport.authenticate("local", {
    failureRedirect: "http://localhost:3000/customer/login",
  }),
  userController.createSession
);

router.post("/addtocart", userController.addProductToCart);

module.exports = router;
