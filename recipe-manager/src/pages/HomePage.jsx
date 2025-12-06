import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../assets/css/HomePage.css";

function HomePage() {

    // Sample data - in real app, fetch from backend or localStorage
    const [recipes, setRecipes] = useState([
        {
            id: 1,
            title: "Pasta Alfredo",
            category: "Lunch",
            image: "https://midwestfoodieblog.com/wp-content/uploads/2023/07/chicken-alfredo-1-2.jpg",
            cookingTime: 20,
            ingredients: "Pasta, Cream, Cheese",
            description: "Cook pasta and mix with Alfredo sauce."
        },
        {
            id: 2,
            title: "Pancakes",
            category: "Breakfast",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAIZ65XhaFb1hzAaTLszlH4wXfrjPXEmi8mw&s",
            cookingTime: 15,
            ingredients: "Flour, Milk, Eggs",
            description: "Mix ingredients and cook on a pan."
        }
    ]);

    const handleEdit = (id) => {
        alert("Edit clicked for recipe ID: " + id);
    };

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this recipe?");
        if (confirmDelete) {
            setRecipes(recipes.filter(recipe => recipe.id !== id));
        }
    };

    return (
        <div className="home-wrapper">
            <div className="home-header">
                <h2>My Recipes</h2>
                <Link to="/add-menu" className="add-btn">➕ Add Recipe</Link>
            </div>

            <div className="card-container">
                {recipes.length === 0 ? (
                    <p className="no-recipes">No recipes added yet!</p>
                ) : (
                    recipes.map(recipe => (
                        <div key={recipe.id} className="recipe-card">
                            <div className="recipe-image">
                                <img src={recipe.image} alt={recipe.title} />
                            </div>
                            <div className="recipe-info">
                                <h3>{recipe.title}</h3>
                                <p><strong>Category:</strong> {recipe.category}</p>
                                <p><strong>Cooking Time:</strong> {recipe.cookingTime} mins</p>
                                <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
                                <p><strong>Description:</strong> {recipe.description}</p>
                            </div>
                            <div className="recipe-actions">
                                <button onClick={() => handleEdit(recipe.id)} className="edit-btn">✏️ Edit</button>
                                <button onClick={() => handleDelete(recipe.id)} className="delete-btn">🗑️ Delete</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default HomePage;
