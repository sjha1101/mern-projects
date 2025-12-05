import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/css/userauth.css";

function Login() {
    const [showForm, setShowForm] = useState(false);

    return (
        <div className="login-wrapper">
            {!showForm && (
                <div>
                    <button className="open-login-btn" onClick={() => setShowForm(true)}>
                        Login
                    </button>
                </div>
            )}
            {showForm && (
                <div className="login-popup">
                    <div className="login-box-1">
                        <div className="neon-corner-blue top-left"></div>
                        <div className="neon-corner-red bottom-right"></div>
                        <div className="login-box">
                            <h2 className="neon-title">LOGIN</h2>
                            <input type="text" className="neon-input" placeholder="Username" />
                            <input type="password" className="neon-input" placeholder="Password" />
                            <button className="sign-btn">Sign In</button>
                            <div className="bottom-links">
                                <a href="#">Forgot Password</a>
                                <Link to="/Signup" className="signup-link">Sign Up</Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Login;
