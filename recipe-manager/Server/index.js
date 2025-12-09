require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const recipeRoutes = require("./routes/recipeRoutes");

const app = express();
app.use(express.json());

// Enable CORS for all routes
app.use(cors({
    origin: "https://mern-projects-eta.vercel.app",
    credentials: true
}));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("MongoDB Error:", err));

app.use("/api", userRoutes);
app.use("/api", recipeRoutes);

// Serve frontend build
app.use(express.static(path.join(__dirname, "../Client/dist")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
