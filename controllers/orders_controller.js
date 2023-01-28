const Order = require("../models/order");
const Product = require("../models/product");

// Create new Order
exports.newOrder = async (req, res) => {
  try {
    const order = await Order.create({
      ...req.body,
      paidAt: Date.now(),
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      order,
    });
  } catch (err) {
    console.log(err);
    return;
  }
};

// get Single Order
exports.getSingleOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!order) {
      return res
        .status(404)
        .json({ message: "Order not found with this Id", success: false });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (err) {
    console.log(err);
    return;
  }
};

// get all Orders -- Admin
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach((order) => {
      totalAmount += order.totalPrice;
    });

    res.status(200).json({
      success: true,
      totalAmount,
      orders,
    });
  } catch (err) {
    console.log(err);
    return;
  }
};

// update Order Status -- Admin
exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res
        .status(404)
        .json({ message: "Order not found with this Id", success: false });
    }

    if (order.orderStatus === "Delivered") {
      return res
        .status(404)
        .json({ message: "Order already delivered", success: false });
    }

    if (req.body.status === "Shipped") {
      order.orderItems.forEach(async (o) => {
        await updateStock(o.product, o.quantity);
      });
    }
    order.orderStatus = req.body.status;

    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    return;
  }
};

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.Stock -= quantity;

  await product.save({ validateBeforeSave: false });
}

// delete Order -- Admin
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res
        .status(404)
        .json({ message: "Order not found with this Id", success: false });
    }

    await order.remove();

    res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    return;
  }
};
