const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/orders_controller");
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");

router.post("/new", isAuthenticatedUser, ordersController.newOrder);

router.get(
  "/:id",
  isAuthenticatedUser,
  authorizedRoles("admin"),
  ordersController.getSingleOrder
);

router.get(
  "/admin/all",
  isAuthenticatedUser,
  authorizedRoles("admin"),
  ordersController.getAllOrders
);

router.put(
  "/admin/:id",
  isAuthenticatedUser,
  authorizedRoles("admin"),
  ordersController.updateOrder
);

router.delete(
  "/admin/:id",
  isAuthenticatedUser,
  authorizedRoles("admin"),
  ordersController.deleteOrder
);

module.exports = router;
