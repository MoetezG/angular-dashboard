const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  getProductsData,
  upload,
} = require("../controllers/productsControllers");

const route = require("express").Router();

route.get("/", getProducts);
route.get("/data", getProductsData);
route.post("/", upload.single("image"), createProduct);
route.put("/:id", upload.single("image"), updateProduct);
route.get("/:id", getProductById);
route.delete("/:id", deleteProduct);
route.get("/category/:category", getProductsByCategory);

module.exports = route;
