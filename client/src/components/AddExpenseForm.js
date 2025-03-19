import { useState } from "react";
import axios from "axios";
import { Form, Button, Alert } from "react-bootstrap";

const AddExpenseForm = ({ onExpenseAdded }) => {
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!category || !amount || !date) {
            setError("All fields are required");
            return;
        }

        try {
            const token = localStorage.getItem("token"); // Get JWT token
            await axios.post("http://localhost:5000/api/expenses", {
                category,
                amount: parseFloat(amount),
                date
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setCategory("");
            setAmount("");
            setDate("");
            setError("");
            onExpenseAdded(); // Refresh list after adding
        } catch (err) {
            setError("Failed to add expense");
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form.Group>
                <Form.Label>Category</Form.Label>
                <Form.Control as="select" value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Select Category</option>
                    <option value="Food">Food</option>
                    <option value="Transport">Transport</option>
                    <option value="Entertainment">Entertainment</option>
                </Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Amount</Form.Label>
                <Form.Control type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Date</Form.Label>
                <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </Form.Group>
            <Button type="submit" className="mt-3">Add Expense</Button>
        </Form>
    );
};

export default AddExpenseForm;
