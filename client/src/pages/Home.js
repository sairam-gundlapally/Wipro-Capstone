import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-black text-white min-vh-100">
      {/* ✅ Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
        <div className="container">
          <a className="navbar-brand d-flex align-items-center" href="/">
            <span className="fw-bold">WealthFlow</span>
          </a>
          <div className="ms-auto">
            <button className="btn btn-outline-light me-2" onClick={() => navigate("/login")}>
              Login
            </button>
            <button className="btn btn-primary" onClick={() => navigate("/register")}>
              Register
            </button>
          </div>
        </div>
      </nav>

      {/* ✅ Hero Section */}
      <header className="text-center py-5">
        <div className="container">
          <h1 className="display-4 fw-bold">Your Wallet, Your Rules.</h1>
          <p className="lead text-secondary">
            Take charge of your money with effortless expense tracking & budgeting.
          </p>
          <button className="btn btn-primary btn-lg me-3" onClick={() => navigate("/register")}>
            Register Now
          </button>
          <button className="btn btn-outline-light btn-lg" onClick={() => navigate("/login")}>
            Login
          </button>
        </div>
      </header>

      {/* ✅ Features Section - Unique Design */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-5">Master Your Money, Without the Hassle.</h2>
          <div className="row text-center">
            <div className="col-lg-4">
              <div className="p-4 bg-dark rounded shadow-lg">
                <h4>Live Expense Insights</h4>
                <p className="text-secondary">
                  No guessing! See where your money goes in real-time.
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="p-4 bg-dark rounded shadow-lg">
                <h4>Smart Financial Growth</h4>
                <p className="text-secondary">
                  Set budgets, track trends, and watch your savings stack up.
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="p-4 bg-dark rounded shadow-lg">
                <h4>Unbreakable Security</h4>
                <p className="text-secondary">
                  Military-grade encryption keeps your data locked and secure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ Footer */}
      <footer className="py-3 bg-black text-center">
        <p className="mb-0 text-secondary">© 2024 WealthFlow. Built for Financial Freedom.</p>
      </footer>
    </div>
  );
}

export default Home;
