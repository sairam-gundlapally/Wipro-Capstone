import React, { useState, useEffect, useCallback } from "react";
import { Container, Row, Col, Card, Form, Button, Navbar, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Expenses() {
  const navigate = useNavigate();
  const [income, setIncome] = useState("");
  const [totalIncome, setTotalIncome] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [customCategory, setCustomCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [newExpense, setNewExpense] = useState({
    amount: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
    description: "",
  });

  // ✅ Fetch expenses from backend (Persist after login)
  const fetchExpenses = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch("http://localhost:5279/api/expenses", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Failed to fetch expenses");

      const data = await response.json();
      setExpenses(data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  }, [navigate]);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  // ✅ Calculate total expenses correctly
  const totalExpenses = expenses.reduce((total, exp) => total + parseFloat(exp.amount), 0);

  // ✅ Calculate remaining balance correctly
  const remainingBalance = totalIncome - totalExpenses;

  // ✅ Add new expense
  const handleAddExpense = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You need to log in first.");
      return;
    }

    let finalCategory = selectedCategory === "Custom Category" ? customCategory : selectedCategory;

    if (!newExpense.amount || isNaN(newExpense.amount) || parseFloat(newExpense.amount) <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    if (!finalCategory) {
      alert("Please select or enter a category.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5279/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: parseFloat(newExpense.amount),
          category: finalCategory,
          date: newExpense.date,
          description: newExpense.description,
        }),
      });

      if (!response.ok) throw new Error("Failed to add expense");

      const savedExpense = await response.json();
      setExpenses([...expenses, savedExpense]); // ✅ Update state with saved expense

      setNewExpense({
        amount: "",
        category: "",
        date: new Date().toISOString().split("T")[0],
        description: "",
      });

      setSelectedCategory("");
      setCustomCategory("");
    } catch (error) {
      console.error("Error adding expense:", error);
      alert("Error saving expense. Try again.");
    }
  };

  // ✅ Delete expense function
  const handleDeleteExpense = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You need to log in first.");
        return;
      }

      const response = await fetch(`http://localhost:5279/api/expenses/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Failed to delete expense");

      setExpenses(expenses.filter((expense) => expense.id !== id)); // ✅ Remove from state
    } catch (error) {
      console.error("Error deleting expense:", error);
      alert("Error deleting expense. Try again.");
    }
  };

  // ✅ Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Container>
      
      <Navbar bg="primary" expand="lg" className="mb-4 px-3 rounded" variant="dark">
        <Navbar.Brand>💰 Finance Tracker</Navbar.Brand>
        <Nav className="ms-auto">
          <Button variant="light" onClick={handleLogout}>🚪 Logout</Button>
        </Nav>
      </Navbar>

      {/* ✅ User Input for Income */}
      <Card className="mb-4 shadow-sm rounded border-0">
        <Card.Body>
          <h4 className="text-primary">Enter Your Total Income</h4>
          <div className="d-flex">
            <Form.Control
              type="number"
              placeholder="Enter Income"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              className="me-1"
            />
            <Button variant="success" onClick={() => setTotalIncome(parseFloat(income) || 0)}>✔ Set Income</Button>
          </div>
          <h5 className="mt-3 text-success">Total Income: ₹{totalIncome}</h5>
          <h5 className="text-danger">Total Expenses: ₹{totalExpenses}</h5>
          <h5 className="text-warning">Remaining Balance: ₹{remainingBalance}</h5>
        </Card.Body>
      </Card>

      <Row>
        <Col md={4}>
          <Card className="shadow-sm rounded border-0">
            <Card.Body>
              <Card.Title className="text-primary">➕ Add New Expense</Card.Title>
              <Form onSubmit={handleAddExpense}>
                <Form.Group className="mb-3">
                  <Form.Label>Amount (₹)</Form.Label>
                  <Form.Control
                    type="number"
                    name="amount"
                    value={newExpense.amount}
                    onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Control as="select" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                    <option value="">Select Category</option>
                    <option value="Custom Category">Custom Category</option>
                    {["Food & Dining", "Transportation", "Shopping"].map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </Form.Control>
                </Form.Group>

                {selectedCategory === "Custom Category" && (
                  <Form.Group className="mb-3">
                    <Form.Label>Enter Custom Category</Form.Label>
                    <Form.Control
                      type="text"
                      value={customCategory}
                      onChange={(e) => setCustomCategory(e.target.value)}
                      placeholder="Type your category"
                    />
                  </Form.Group>
                )}

                <Form.Group className="mb-3">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    value={newExpense.date}
                    onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    name="description"
                    value={newExpense.description}
                    onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                    placeholder="Optional description"
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">➕ Add Expense</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* ✅ Expense List with Delete Option */}
        <Col md={8}>
          <Card className="shadow-sm rounded border-0">
            <Card.Body>
              <Card.Title className="text-primary">📜 Expense List</Card.Title>
              {expenses.map((expense) => (
                <div key={expense.id} className="d-flex justify-content-between align-items-center border-bottom py-2">
                  <div>
                    <strong>{expense.category}</strong><br/>
                    Date: {new Date(expense.date).toLocaleDateString("en-GB")}<br/>
                    <small>{expense.description}</small>
                  </div>
                  <div>₹{expense.amount} <Button variant="danger" size="sm" onClick={() => handleDeleteExpense(expense.id)}>🗑 Delete</Button></div>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Expenses;
