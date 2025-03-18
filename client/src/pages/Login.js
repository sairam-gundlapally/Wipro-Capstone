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
            navigate("/expenses"); // Redirect to expenses on success
        } catch (error) {
            alert("Invalid credentials. Please try again.");
        }
    };

    return (
        <div className="container mt-5">
            <h2>Login</h2>
            <input type="email" className="form-control" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" className="form-control" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button className="btn btn-primary mt-2" onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;
