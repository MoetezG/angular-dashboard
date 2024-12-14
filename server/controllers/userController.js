const User = require("../models/user");

const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
// Register a new user

register = async (req, res) => {
  try {
    const { userName, email, phone } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = new User({ userName, email, phone });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all users

getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a user by ID

getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a user

updateUser = async (req, res) => {
  try {
    const { email, userName, phone } = req.body;

    const user = await User.findByIdAndUpdate(req.params.id, {
      email,
      userName,
      phone,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a user

deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all customers data

getCustomersData = async (req, res) => {
  try {
    const customers = await User.aggregate([
      { $group: { _id: { $month: "$createdAt" }, customerCount: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);

    const formattedData = {
      labels: customers.map((c) =>
        new Date(0, c._id - 1).toLocaleString("default", { month: "long" })
      ),
      values: customers.map((c) => c.customerCount),
    };

    res.status(200).json(formattedData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  register,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getCustomersData,
};
