const express = require("express");
const router = express.Router();

const userController = require("../controllers/user_controller");
const { isAuthenticatedUser } = require("../middleware/auth");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/logout", userController.logout);
router.get("/me", isAuthenticatedUser, userController.getUserDetails);

module.exports = router;
