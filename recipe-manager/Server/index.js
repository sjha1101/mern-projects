require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const recipeRoutes = require("./routes/recipeRoutes");

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: ["https://mern-projects-ao1kgvluv-surbhi-jhas-projects.vercel.app"],
    credentials: true,
  })
);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log("DB Error:", err));

app.use("/api", userRoutes);
app.use("/api", recipeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));