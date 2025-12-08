import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../assets/css/HomePage.css";

function HomePage() {

    const [recipes, setRecipes] = useState([]);

    const API = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const res = await fetch(`${API}/api/add`);
                const data = await res.json();
                setRecipes(data);
            } catch (err) {
                console.error("Error fetching recipes:", err);
            }
        };

        fetchRecipes();
    }, []);

    const handleEdit = (id) => {
        alert("Edit clicked for recipe ID: " + id);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this recipe?")) return;

        try {
            await fetch(`${API}/api/delete/${id}`, {
                method: "DELETE"
            });

            setRecipes(recipes.filter(recipe => recipe._id !== id));

        } catch (err) {
            console.log("Delete error:", err);
        }
    };

    return (
        <div className="home-wrapper">
            <div className="home-header">
                <h2>My Recipes</h2>
                <Link to="/AddMenu" className="add-btn">➕ Add Recipe</Link>
            </div>

            <div className="card-container">
                {recipes.length === 0 ? (
                    <p className="no-recipes">No recipes added yet!</p>
                ) : (
                    recipes.map(recipe => (
                        <div key={recipe._id} className="recipe-card">
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
                                <button onClick={() => handleEdit(recipe._id)} className="edit-btn">✏️ Edit</button>
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
