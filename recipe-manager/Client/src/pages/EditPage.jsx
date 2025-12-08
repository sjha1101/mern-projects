import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../assets/css/AddMenu.css";
import "bootstrap/dist/css/bootstrap.min.css";

function EditPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const recipe = location.state?.recipe;

    const [formData, setFormData] = useState({
        _id: recipe?._id || "",
        title: recipe?.title || "",
        category: recipe?.category || "Breakfast",
        image: recipe?.image || "",
        cookingTime: recipe?.cookingTime || 0,
        ingredients: recipe?.ingredients || "",
        description: recipe?.description || ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const API = import.meta.env.VITE_API_URL;
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!formData.title || !formData.category || !formData.ingredients) {
            return setError("Please fill all required fields");
        }

        try {
            const response = await fetch(`${API}/api/edit/${formData._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess("Recipe updated successfully!");

                setTimeout(() => navigate("/"), 1500);
            } else {
                setError(data.message || "Update failed");
            }
        } catch (err) {
            console.error(err);
            setError("Server error while updating recipe");
        }
    };

    return (
        <div className="container d-flex justify-content-center mt-5">
            <div className="box">
                <div className="form-card">
                    <h2 className="text-center mb-4">Edit Your Recipe</h2>

                    {error && <p className="text-danger text-center">{error}</p>}
                    {success && <p className="text-success text-center">{success}</p>}

                    <form onSubmit={handleSubmit}>
                        <div className="row g-4">

                            <div className="col-md-6">
                                <label className="form-label">Recipe Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={formData.title}
                                    onChange={(e) =>
                                        setFormData({ ...formData, title: e.target.value })
                                    }
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Category</label>
                                <select
                                    className="form-select"
                                    value={formData.category}
                                    onChange={(e) =>
                                        setFormData({ ...formData, category: e.target.value })
                                    }
                                >
                                    <option>Breakfast</option>
                                    <option>Lunch</option>
                                    <option>Dinner</option>
                                    <option>Snacks</option>
                                </select>
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Ingredients</label>
                                <textarea
                                    className="form-control"
                                    rows="3"
                                    value={formData.ingredients}
                                    onChange={(e) =>
                                        setFormData({ ...formData, ingredients: e.target.value })
                                    }
                                ></textarea>
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Description</label>
                                <textarea
                                    className="form-control"
                                    rows="3"
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData({ ...formData, description: e.target.value })
                                    }
                                ></textarea>
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Image URL</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={formData.image}
                                    onChange={(e) =>
                                        setFormData({ ...formData, image: e.target.value })
                                    }
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Cooking Time (minutes)</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={formData.cookingTime}
                                    onChange={(e) =>
                                        setFormData({ ...formData, cookingTime: e.target.value })
                                    }
                                />
                            </div>

                        </div>

                        <div className="text-center mt-4">
                            <button type="submit" className="btn btn-custom">
                                Update Recipe
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditPage;
