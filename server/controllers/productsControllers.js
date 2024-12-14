const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const Products = require("../models/products");
const multer = require("multer");
const path = require("path");

// Set up storage engine for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set the destination folder to 'uploads'
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // Set the file name to the product name + extension
    const fileName =
      req.body.name.replace(/\s+/g, "-").toLowerCase() +
      path.extname(file.originalname);
    cb(null, fileName); // Save with the product name as the filename
  },
});

// Initialize multer with the storage configuration
const upload = multer({ storage });

getProducts = async (req, res) => {
  try {
    const products = await Products.find().populate("categoryId");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

getProductById = async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create Product controller
createProduct = async (req, res) => {
  try {
    // Handle the file upload separately using multer
    const { name, price, stock, description, categoryId } = req.body;

    // Check if image file is provided
    let image = "";
    if (req.file) {
      // If an image was uploaded, use the image filename
      image = req.file.filename;
    }

    const product = new Products({
      name,
      price,
      description,
      image,
      categoryId,
      stock,
    });

    // Save the product to the database
    await product.save();
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

updateProduct = async (req, res) => {
  try {
    const { name, price, stock, description, categoryId } = req.body;

    // Ensure categoryId is converted to ObjectId if it's a valid string
    let categoryObjectId = null;
    if (categoryId && typeof categoryId === "string") {
      categoryObjectId = new ObjectId(categoryId); // Convert categoryId to ObjectId
    }

    // Handle image upload
    let image = "";
    if (req.file) {
      image = req.file.filename;
    } else {
      const product = await Products.findById(req.params.id);
      if (product && product.image) {
        image = product.image; // Keep the old image if no new one is uploaded
      }
    }

    // Update the product in the database
    const product = await Products.findByIdAndUpdate(
      req.params.id,
      {
        name,
        price,
        description,
        image,
        categoryId: categoryObjectId, // Ensure categoryId is ObjectId
        stock,
      },
      { new: true } // Return the updated product
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product, // Return the updated product in the response
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

deleteProduct = async (req, res) => {
  try {
    const product = await Products.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

getProductsByCategory = async (req, res) => {
  try {
    const products = await Products.find({ categoryId: req.params.category });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

getProductsData = async (req, res) => {
  try {
    const products = await Products.aggregate([
      {
        $group: {
          _id: "$categoryId",
          productCount: { $sum: 1 },
          name: { $first: "$name" },
        },
      },
      { $sort: { productCount: -1 } },
    ]);
    const formattedData = {
      labels: products.map((p) => p.name),
      values: products.map((p) => p.productCount),
    };

    res.status(200).json(formattedData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  upload,
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  getProductsData,
};
