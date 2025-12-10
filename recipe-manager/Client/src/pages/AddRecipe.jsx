import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/AddMenu.css";
import { API } from "../config";

function AddRecipe() {
    const [form, setForm] = useState({
        name: "",
        category: "",
        ingredients: "",
        description: "",
        cookingTime: "",
        image: null,
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setForm({ ...form, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.name || !form.category || !form.ingredients || !form.description || !form.cookingTime || !form.image) {
            alert("Please fill all fields and upload an image.");
            return;
        }

        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("category", form.category);
        formData.append("ingredients", form.ingredients);
        formData.append("description", form.description);
        formData.append("cookingTime", form.cookingTime);
        formData.append("image", form.image);

        try {
            const res = await fetch(`${API}/api/add`, {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (res.ok) {
                alert("Recipe added successfully!");
                window.location.href = "/HomePage";
            } else {
                alert(data.message || "Failed to add recipe");
            }
        } catch (err) {
            console.error("Add recipe error:", err);
            alert("Server error while adding recipe.");
        }
    };

    return (
        <div className="container d-flex justify-content-center mt-5">
            <div className="box">
                <div className="form-card">
                    <h2 className="text-center mb-4">Add Your Recipe</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="row g-4">
                            <div className="col-md-6">
                                <label className="form-label">Recipe Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    placeholder="Enter recipe name"
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Category</label>
                                <select
                                    name="category"
                                    className="form-select"
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Category</option>
                                    <option>Breakfast</option>
                                    <option>Lunch</option>
                                    <option>Dinner</option>
                                </select>
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Ingredients</label>
                                <textarea
                                    name="ingredients"
                                    className="form-control"
                                    rows="3"
                                    placeholder="List ingredients (comma separated)"
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Description</label>
                                <textarea
                                    name="description"
                                    className="form-control"
                                    rows="3"
                                    placeholder="Write recipe steps..."
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Upload Image</label>
                                <input
                                    type="file"
                                    name="image"
                                    className="form-control"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    required
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Cooking Time (minutes)</label>
                                <input
                                    type="number"
                                    name="cookingTime"
                                    className="form-control"
                                    placeholder="e.g. 15"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="text-center mt-4">
                            <button type="submit" className="btn btn-custom">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddRecipe;
