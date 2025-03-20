import React, { useState, useEffect, useCallback } from "react";
import { Container, Row, Col, Card, Form, Button, Navbar, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

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

  return (
   
    <Container className="py-4 shadow-lg bg-black">
       
      
      {/* ✅ Updated Navbar with better spacing */}
      <Navbar bg="black" expand="lg" className="mb-4 px-3 rounded shadow-sm" variant="dark">
  <Navbar.Brand className="fw-bold">Personal Finance Tracker</Navbar.Brand>
  <Nav className="ms-auto">
    <Button
      variant="outline-light"
      onClick={() => {
        localStorage.removeItem("token");
        navigate("/login");
      }}
    >
      <FiLogOut className="me-2" /> Logout
    </Button>
  </Nav>
</Navbar>

      {/* ✅ User Input for Income */}
      <Card className="mb-4 shadow-sm border-0 rounded">
        <Card.Body>
          <h4 className="text-dark">Enter Your Total Income</h4>
          <div className="d-flex">
            <Form.Control
              type="number"
              placeholder="Enter Income"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              className="me-2 rounded-pill"
            />
            <Button variant="primary" className="rounded-pill" onClick={() => setTotalIncome(parseFloat(income) || 0)}> Set Income</Button>
          </div>
          <h5 className="mt-3 text-black fw-bold">Total Income: ₹{totalIncome}</h5>
          <h5 className="text-black fw-bold">Total Expenses: ₹{totalExpenses}</h5>
          <h5 className="text-black fw-bold">Remaining Balance: ₹{remainingBalance}</h5>
        </Card.Body>
      </Card>

      <Row>
        <Col md={4}>
          <Card className="shadow-sm border-0 rounded">
            <Card.Body>
              <Card.Title className="text-primary">➕ Add New Expense</Card.Title>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Amount (₹)</Form.Label>
                  <Form.Control type="number" className="rounded" required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Select className="rounded">
                    <option>Select Category</option>
                    <option>Food & Dining</option>
                    <option>Transportation</option>
                    <option>Shopping</option>
                    <option>Custom Category</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Date</Form.Label>
                  <Form.Control type="date" className="rounded" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control type="text" placeholder="Optional description" className="rounded" />
                </Form.Group>

                <Button variant="primary" className="w-100 rounded-pill"> Add Expense</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* ✅ Expense List with Delete Option */}
        <Col md={8}>
          <Card className="shadow-sm border-0 rounded ">
            <Card.Body>
              <Card.Title className="text-primary">📜 Expense List</Card.Title>
              {expenses.map((expense) => (
                <div key={expense.id} className="d-flex justify-content-between align-items-center border-bottom py-2 ">
                  <div>
                    <strong>{expense.category}</strong><br/>
                    <span className="text-muted">{new Date(expense.date).toLocaleDateString("en-GB")}</span><br/>
                    <small className="text-secondary">{expense.description}</small>
                  </div>
                  <div className="text-end">
                    <span className="fw-bold text-dark">₹{expense.amount}</span>
                    <Button variant="outline-danger" size="sm" className="ms-2 rounded-pill">Delete</Button>
                  </div>
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
