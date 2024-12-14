const express = require("express");
const cors = require("cors");
const app = express();
const dbConnection = require("./config/dbConnection");

const userRoutes = require("./routes/userRoutes");
const producstRoutes = require("./routes/productsRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const orderRoutes = require("./routes/ordersRoutes");

dbConnection();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Welcome to the e-commerce API");
});

app.use("/api/uploads", express.static("uploads"));
app.use("/api/users", userRoutes);
app.use("/api/products", producstRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);

app.listen(8080, () => {
  console.log("Server is running on localhost:8080");
});
