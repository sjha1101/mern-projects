const Recipe = require("../models/recipeModel");
const multer = require("multer");
const path = require("path");

// Multer setup for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

exports.uploadMiddleware = upload.single("image");

exports.addRecipe = async (req, res) => {
    try {
        const { name, category, ingredients, description, cookingTime } = req.body;

        if (!name || !category || !ingredients || !description || !cookingTime) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newRecipe = new Recipe({
            name,
            category,
            ingredients: ingredients.split(",").map(i => i.trim()), // convert string to array
            description,
            cookingTime,
            image: req.file ? `/uploads/${req.file.filename}` : "",
        });

        await newRecipe.save();
        res.status(201).json(newRecipe);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
};

exports.getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.status(200).json(recipes);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
};

exports.updateRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(recipe);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
};

exports.deleteRecipe = async (req, res) => {
    try {
        await Recipe.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Recipe deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
};

module.exports.uploadMiddleware = upload.single("image");
