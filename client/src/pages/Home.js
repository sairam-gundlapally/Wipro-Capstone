import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Wallet, BarChart, Lock, TrendingUp } from "lucide-react";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-black text-white min-vh-100">
      {/* ✅ Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
        <div className="container">
          <a className="navbar-brand d-flex align-items-center" href="/">
            <Wallet className="me-2 text-primary" />
            <span className="fw-bold text-white">WealthFlow</span>
          </a>
          <div className="ms-auto">
            <button className="btn btn-outline-warning me-2 fw-bold px-4 py-2" onClick={() => navigate("/login")}>
              🔑 Sign In
            </button>
            <button className="btn btn-success fw-bold px-4 py-2" onClick={() => navigate("/register")}>
              🚀 Join Now
            </button>
          </div>
        </div>
      </nav>

      {/* ✅ Hero Section */}
      <header className="text-center py-5">
        <div className="container">
          <h1 className="display-4 fw-bold text-info">Money in Control, Stress Out.</h1>
          <p className="lead text-light">
            Track, save, and grow your wealth effortlessly.
          </p>
          <button className="btn btn-success btn-lg me-3 fw-bold shadow" onClick={() => navigate("/register")}>
            Get Started 🚀
          </button>
          <button className="btn btn-outline-warning btn-lg fw-bold shadow" onClick={() => navigate("/login")}>
            Log In 🔑
          </button>
        </div>
      </header>

      {/* ✅ Features Section - Modern Grid Layout */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-5 text-warning fw-bold">🚀 Why Choose WealthFlow?</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="feature-box bg-dark p-4 text-center rounded shadow-lg border border-warning">
                <BarChart size={50} className="text-warning mb-3" />
                <h4 className="fw-bold text-light">Instant Spending Insights</h4>
                <p className="text-secondary">Know where your money goes—no surprises.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-box bg-dark p-4 text-center rounded shadow-lg border border-info">
                <TrendingUp size={50} className="text-info mb-3" />
                <h4 className="fw-bold text-light">Smart Budgeting</h4>
                <p className="text-secondary">Set goals & crush them with AI-powered tracking.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-box bg-dark p-4 text-center rounded shadow-lg border border-danger">
                <Lock size={50} className="text-danger mb-3" />
                <h4 className="fw-bold text-light">Top-Tier Security</h4>
                <p className="text-secondary">Your data stays yours—protected & encrypted.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ Footer */}
      <footer className="py-3 bg-dark text-center">
        <p className="mb-0 text-secondary">© 2024 WealthFlow. Built for Financial Freedom.</p>
      </footer>
    </div>
  );
}

export default Home;
