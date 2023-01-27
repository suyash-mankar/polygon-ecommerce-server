const express = require("express");
const router = express.Router();

const userController = require("../controllers/user_controller");
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/logout", userController.logout);
router.get("/me", isAuthenticatedUser, userController.getUserDetails);
router.get(
  "/admin/all",
  isAuthenticatedUser,
  authorizedRoles("admin"),
  userController.getAllUser
);

module.exports = router;
