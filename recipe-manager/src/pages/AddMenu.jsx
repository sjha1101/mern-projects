import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/AddMenu.css";

function AddMenu() {
    return (
        <div className="container d-flex justify-content-center mt-5">
            <div className="box">
                <div className="form-card">

                    <h2 className="text-center mb-4">Add Your Recipe</h2>

                    <form>

                        <div className="row g-4">

                            <div className="col-md-6">
                                <label className="form-label">Recipe Name</label>
                                <input type="text" className="form-control" placeholder="Enter recipe name" />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Category</label>
                                <select className="form-select">
                                    <option>Select Category</option>
                                    <option>Breakfast</option>
                                    <option>Lunch</option>
                                    <option>Dinner</option>
                                </select>
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Ingredients</label>
                                <textarea className="form-control" rows="3" placeholder="List ingredients (comma separated)"></textarea>
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Description</label>
                                <textarea className="form-control" rows="3" placeholder="Write recipe steps..."></textarea>
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Upload Image</label>
                                <input type="file" className="form-control" />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Cooking Time (minutes)</label>
                                <input type="number" className="form-control" placeholder="e.g. 15" />
                            </div>

                        </div>

                        <div className="text-center mt-4">
                            <a href="/HomePage" className="btn btn-custom">Submit</a>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddMenu;
