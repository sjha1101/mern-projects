import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/userauth.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
    const [showForm, setShowForm] = useState(false);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const navigate = useNavigate();

    const API = import.meta.env.VITE_API_URL;
    // console.log("API URL:", API);
    const handleLogin = async () => {
        setError("");
        setSuccess("");

        if (!username || !password) {
            return setError("All fields are required");
        }

        try {
            const response = await fetch(`${API}api/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess("Login Successful!");

                if (data.token) {
                    localStorage.setItem("token", data.token);
                }

                setTimeout(() => {
                    navigate("/dashboard");
                }, 700);

            } else {
                setError(data.message || "Invalid credentials");
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

                        {!showForm && (
                            <button
                                className="open-login-btn w-100"
                                onClick={() => setShowForm(true)}
                            >
                                Login
                            </button>
                        )}

                        {showForm && (
                            <div className="login-popup">
                                <div className="login-box-1">

                                    {/* Neon Corners */}
                                    <div className="neon-corner-blue top-left"></div>
                                    <div className="neon-corner-red bottom-right"></div>

                                    <div className="login-box">

                                        <button
                                            className="close-btn back-btn"
                                            onClick={() => setShowForm(false)}
                                        >
                                            ⬅
                                        </button>

                                        <h2 className="neon-title">LOGIN</h2>

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

                                        <button className="sign-btn" onClick={handleLogin}>
                                            Sign In
                                        </button>

                                        <div className="bottom-links">
                                            <a href="#">Forgot Password</a>
                                            <Link to="/Signup" className="signup-link">
                                                Sign Up
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>

                </div>
            </div>
        </div>
    );
}

export default Login;
