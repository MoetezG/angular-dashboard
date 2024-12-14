const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryControllers");

const Route = require("express").Router();

Route.post("/", createCategory);
Route.get("/", getCategories);
Route.get("/:id", getCategoryById);
Route.put("/:id", updateCategory);
Route.delete("/:id", deleteCategory);

module.exports = Route;
