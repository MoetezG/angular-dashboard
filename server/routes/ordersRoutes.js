const {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrdersData,
} = require("../controllers/ordersControllers");

const route = require("express").Router();

route.post("/", createOrder);
route.get("/", getOrders);
route.get("/data", getOrdersData);
route.get("/:id", getOrderById);
route.put("/:id", updateOrder);
route.delete("/:id", deleteOrder);

module.exports = route;
