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
            navigate("/login"); // Redirect to login after successful registration
        } catch (error) {
            console.error("Registration Error:", error.response?.data || error.message);
            alert(`Error: ${error.response?.data?.message || "Something went wrong!"}`);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Register</h2>
            <input type="text" className="form-control" placeholder="Name" onChange={(e) => setName(e.target.value)} />
            <input type="email" className="form-control" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" className="form-control" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button className="btn btn-success mt-2" onClick={handleRegister}>Register</button>
        </div>
    );
}

export default Register;
