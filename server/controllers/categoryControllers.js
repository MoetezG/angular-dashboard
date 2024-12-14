const Category = require("../models/category");

getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = new Category({
      name,
      description,
    });

    await category.save();
    res.status(201).json({ message: "Category created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = await Category.findByIdAndUpdate(req.params.id, {
      name,
      description,
    });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
