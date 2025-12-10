import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/css/userauth.css";
import { API } from "../config";
function SignUp() {
    const [showForm, setShowForm] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    console.log("API URL:", API);

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
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess("Registration successful!");
            } else {
                setError(data.message || "Something went wrong");
            }

        } catch (err) {
            setError("Server error");
        }
    };

    return (
        <div className="signup-wrapper">
            {showForm && (
                <div className="signup-popup">
                    <div className="signup-box-1">
                        <div className="neon-corner-blue top-left"></div>
                        <div className="neon-corner-red bottom-right"></div>

                        <div className="signup-box">
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
                                placeholder="confirmPassword"
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
            )}
        </div>
    );
}

export default SignUp;
