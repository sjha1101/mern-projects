require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const recipeRoutes = require("./routes/recipeRoutes");

const app = express();
app.use(express.json());

// ----------------------
// GLOBAL CORS SETTINGS
// ----------------------
const corsOptions = {
    origin: "https://mern-projects-eta.vercel.app",   // Allow only your deployed frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
};

app.use(cors(corsOptions));          // Apply CORS globally
app.options("*", cors(corsOptions)); // Allow all preflight routes

// ----------------------
// MONGODB CONNECTION
// ----------------------
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected successfully"))
    .catch(err => console.error("MongoDB connection error:", err));

// ----------------------
// API ROUTES
// ----------------------
app.use("/api", userRoutes);
app.use("/api", recipeRoutes);

// ----------------------
// SERVE FRONTEND BUILD
// ----------------------
const clientBuildPath = path.join(__dirname, "../Client/dist");
app.use(express.static(clientBuildPath));

// ----------------------
// START SERVER
// ----------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
