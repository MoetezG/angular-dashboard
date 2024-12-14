const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_URL).then(() => {
      console.log("Connected to DB");
    });
  } catch (error) {
    throw new Error("Error connecting to MongoDB", error);
  }
};

module.exports = dbConnection;
