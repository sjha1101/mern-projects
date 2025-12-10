import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/userauth.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { API } from "../config";

function SignUp() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const navigate = useNavigate();

    const handleSignUp = async () => {
        setError("");
        setSuccess("");

        if (!username || !password || !confirmPassword) {
            return setError("All fields are required");
        }

        if (password !== confirmPassword) {
            return setError("Passwords do not match");
        }

        try {
            const response = await fetch(`${API}/api/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }), // FIXED
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess("Registration Successful!");

                setTimeout(() => {
                    navigate("/");
                }, 800);
            } else {
                setError(data.message || "Something went wrong");
            }
        } catch (err) {
            setError("Server error");
        }
    };

    return (
        <div className="container-fluid login-wrapper">
            <div className="row justify-content-center">
                <div className="col-md-3 col-sm-6 d-flex justify-content-center">
                    <div className="login-backbtn">

                        <div className="login-popup">
                            <div className="login-box-1">

                                <div className="login-box">
                                    <button
                                        className="close-btn back-btn"
                                        onClick={() => navigate("/")}
                                    >
                                        ⬅
                                    </button>

                                    <h2 className="neon-title">SIGN UP</h2>

                                    {error && <p className="error-text">{error}</p>}
                                    {success && <p className="success-text">{success}</p>}

                                    <input
                                        type="text"
                                        className="neon-input"
                                        placeholder="Username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />

                                    <input
                                        type="password"
                                        className="neon-input"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />

                                    <input
                                        type="password"
                                        className="neon-input"
                                        placeholder="Confirm Password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />

                                    <button className="sign-btn" onClick={handleSignUp}>
                                        Register
                                    </button>

                                    <div className="bottom-links">
                                        <Link to="/" className="signup-link">
                                            Already have an account? Login
                                        </Link>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
