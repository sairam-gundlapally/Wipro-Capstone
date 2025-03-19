import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://localhost:5279/api/auth/login", { email, password });
            localStorage.setItem("token", response.data.token);
            navigate("/expenses");
        } catch (error) {
            alert("Invalid credentials. Please try again.");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100" 
             style={{ background: "linear-gradient(135deg, #2c3e50, #0f0f0f)" }}>
            <div className="p-4 rounded shadow-lg bg-black w-25">
                <h2 className="text-center mb-3 text-white fw-bold">Sign In</h2>
                <p className="text-center text-secondary">Access your expense tracker account</p>

                <input 
                    type="email" 
                    className="form-control mb-3 bg-secondary text-white border-0 rounded-3" 
                    placeholder="Email Address" 
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <input 
                    type="password" 
                    className="form-control mb-3 bg-secondary text-white border-0 rounded-3" 
                    placeholder="Password" 
                    onChange={(e) => setPassword(e.target.value)} 
                />

                <button 
                    className="btn btn-success w-100 fw-bold mb-2 shadow-sm rounded-3" 
                    onClick={handleLogin}
                >
                    Log In
                </button>

                <p className="text-center text-secondary">
                    New user?{" "}
                    <span className="text-primary fw-bold cursor-pointer" role="button" onClick={() => navigate("/register")}>
                        Create an Account
                    </span>
                </p>
            </div>
        </div>
    );
}

export default Login;
