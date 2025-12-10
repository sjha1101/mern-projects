import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../assets/css/HomePage.css";
import { API } from "../config";

function HomePage() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const res = await fetch(`${API}/api/all`);
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                const data = await res.json();
                setRecipes(data);
            } catch (err) {
                console.error("Error fetching recipes:", err);
            }
        };

        fetchRecipes();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this recipe?")) return;

        try {
            const res = await fetch(`${API}/api/delete/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) throw new Error("Failed to delete recipe");

            setRecipes(recipes.filter(recipe => recipe._id !== id));
        } catch (err) {
            console.error("Delete error:", err);
        }
    };

    return (
        <div className="home-wrapper">
            <div className="home-header">
                <h2>My Recipes</h2>
                <Link to="/AddRecipe" className="add-btn">➕ Add Recipe</Link>
            </div>

            <div className="card-container">
                {recipes.length === 0 ? (
                    <p className="no-recipes">No recipes added yet!</p>
                ) : (
                    recipes.map(recipe => (
                        <div key={recipe._id} className="recipe-card">
                            <div className="recipe-image">
                                <img src={recipe.image} alt={recipe.name || recipe.title} />
                            </div>

                            <div className="recipe-info">
                                <h3>{recipe.name || recipe.title}</h3>
                                <p><strong>Category:</strong> {recipe.category}</p>
                                <p><strong>Cooking Time:</strong> {recipe.cookingTime} mins</p>
                                <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
                                <p><strong>Description:</strong> {recipe.description}</p>
                            </div>

                            <div className="recipe-actions">
                                <Link to={`/edit/${recipe._id}`} className="edit-btn">✏️ Edit</Link>
                                <button onClick={() => handleDelete(recipe._id)} className="delete-btn">🗑️ Delete</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default HomePage;
