import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/css/userauth.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
    const [showForm, setShowForm] = useState(false);

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


                                        <input
                                            type="text"
                                            className="neon-input"
                                            placeholder="Username"
                                        />
                                        <input
                                            type="password"
                                            className="neon-input"
                                            placeholder="Password"
                                        />

                                        <button className="sign-btn">Sign In</button>

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
