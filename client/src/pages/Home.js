import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
    const navigate = useNavigate();

    return (
        <div className="container text-center mt-5">
            <h2>Welcome to Personal Finance Tracker</h2>
            <p>Manage your expenses with ease!</p>
            <button className="btn btn-primary m-2" onClick={() => navigate("/login")}>
                Login
            </button>
            <button className="btn btn-success m-2" onClick={() => navigate("/register")}>
                Register
            </button>
        </div>
    );
}

export default Home;
