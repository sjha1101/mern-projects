require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const userRoutes = require("./routes/userRoutes");
const recipeRoutes = require("./routes/recipeRoutes");

const app = express();

app.use(express.json());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

connectDB();

app.use("/api/", userRoutes);
app.use("/api/", recipeRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://127.0.0.1:${process.env.PORT}`);
});
