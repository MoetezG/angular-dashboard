const {
  register,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getCustomersData,
} = require("../controllers/userController");

const express = require("express");
const Route = express.Router();

Route.post("/", register);
Route.get("/", getUsers);
Route.get("/data", getCustomersData);
Route.get("/:id", getUserById);
Route.put("/:id", updateUser);
Route.delete("/:id", deleteUser);

module.exports = Route;
