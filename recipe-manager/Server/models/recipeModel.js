const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    ingredients: {
        type: [String],  
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,   
    },
    cookingTime: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model("Recipe", recipeSchema);
