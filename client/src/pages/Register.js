import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            await axios.post("http://localhost:5279/api/auth/register", { name, email, passwordHash: password });
            alert("Registration successful! Redirecting to login...");
            navigate("/login");
        } catch (error) {
            console.error("Registration Error:", error.response?.data || error.message);
            alert(`Error: ${error.response?.data?.message || "Something went wrong!"}`);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100" 
             style={{ background: "linear-gradient(135deg, #0f0f0f, #2c3e50)" }}>
            <div className="p-4 rounded shadow-lg bg-black w-25">
                <h2 className="text-center mb-3 text-white">Create an Account</h2>
                <p className="text-center text-secondary">Start managing your finances today.</p>

                <input 
                    type="text" 
                    className="form-control mb-3 bg-secondary text-white border-0" 
                    placeholder="Full Name" 
                    onChange={(e) => setName(e.target.value)} 
                />
                <input 
                    type="email" 
                    className="form-control mb-3 bg-secondary text-white border-0" 
                    placeholder="Email Address" 
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <input 
                    type="password" 
                    className="form-control mb-3 bg-secondary text-white border-0" 
                    placeholder="Password" 
                    onChange={(e) => setPassword(e.target.value)} 
                />

                <button 
                    className="btn btn-success w-100 fw-bold mb-2" 
                    onClick={handleRegister}
                >
                    Sign Up
                </button>

                <p className="text-center text-secondary">
                    Already have an account?{" "}
                    <span className="text-primary fw-bold cursor-pointer" role="button" onClick={() => navigate("/login")}>
                        Log In
                    </span>
                </p>
            </div>
        </div>
    );
}

export default Register;
