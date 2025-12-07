import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/css/userauth.css";

function SignUp() {
    const [showForm, setShowForm] = useState(true);
    return (
        <div className="signup-wrapper">
            {showForm && (
                <div className="signup-popup">
                    <div className="signup-box-1">
                        <div className="neon-corner-blue top-left"></div>
                        <div className="neon-corner-red bottom-right"></div>

                        <div className="signup-box">
                            <h2 className="neon-title">SIGN UP</h2>
                            <input type="text" className="neon-input" placeholder="Username" />
                            <input type="email" className="neon-input" placeholder="Email" />
                            <input type="password" className="neon-input" placeholder="Password" />
                            <input type="password" className="neon-input" placeholder="Confirm Password" />
                            <button className="sign-btn">Register</button>

                            <div className="bottom-links">
                                <Link to="/" className="signup-link">Already have an account? Login</Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SignUp;
