const Order = require("../models/orders");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
getOrders = async (req, res) => {
  try {
    const { searsh } = req.query;
    const orders = await Order.find().populate("userId", "userName");
    console.log(orders);
    return res.status(200).json(orders);

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

createOrder = async (req, res) => {
  try {
    const {
      userId,
      products,
      totalPrice,
      totalAmount,
      shippingAddress,
      status,
    } = req.body;
    const order = new Order({
      userId,
      products,
      totalPrice,
      totalAmount,
      shippingAddress,
      status,
    });

    await order.save();
    res.status(201).json({ message: "Order created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

updateOrder = async (req, res) => {
  try {
    const {
      userId,
      products,
      totalPrice,
      totalAmount,
      shippingAddress,
      status,
    } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, {
      userId,
      products,
      totalPrice,
      totalAmount,
      shippingAddress,
      status,
    });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

getOrdersData = async (req, res) => {
  try {
    const orders = await Order.aggregate([
      {
        $group: {
          _id: { $month: "$orderDate" },
          totalRevenue: { $sum: "$totalAmount" },
          orderCount: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const formattedData = {
      labels: orders.map((order) =>
        new Date(0, order._id - 1).toLocaleString("default", { month: "long" })
      ),
      revenueValues: orders.map((order) => order.totalRevenue),
      salesValues: orders.map((order) => order.orderCount),
    };

    res.status(200).json(formattedData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrdersData,
};
