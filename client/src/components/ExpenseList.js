import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Table, Button, Form } from "react-bootstrap";

const ExpenseList = () => {
    const [expenses, setExpenses] = useState([]);
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true); // ✅ Prevents infinite pagination clicks

    // ✅ Fetch expenses with filters & pagination
    const fetchExpenses = useCallback(async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("User not authenticated");
                return;
            }

            const response = await axios.get(`http://localhost:5279/api/expenses`, {
                params: { category, date, page },
                headers: { Authorization: `Bearer ${token}` }
            });

            setExpenses(response.data);
            setHasMore(response.data.length > 0); // ✅ Disable 'Next' if no more results
        } catch (error) {
            console.error("Error fetching expenses:", error);
            alert("Error fetching expenses. Please try again.");
        }
    }, [category, date, page]);

    useEffect(() => {
        fetchExpenses();
    }, [fetchExpenses]);

    return (
        <div>
            <h3>Expense List</h3>
            <Form>
                <Form.Group>
                    <Form.Label>Filter by Category</Form.Label>
                    <Form.Control as="select" value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="">All</option>
                        <option value="Food">Food</option>
                        <option value="Transport">Transport</option>
                        <option value="Entertainment">Entertainment</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Filter by Date</Form.Label>
                    <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </Form.Group>
            </Form>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Amount (₹)</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.length > 0 ? (
                        expenses.map((expense) => (
                            <tr key={expense.id}>
                                <td>{expense.category}</td>
                                <td>₹{expense.amount}</td>
                                <td>{new Date(expense.date).toLocaleDateString("en-GB")}</td> 
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="text-center text-muted">No expenses found</td>
                        </tr>
                    )}
                </tbody>
            </Table>

            <Button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</Button>
            <Button onClick={() => setPage(page + 1)} disabled={!hasMore}>Next</Button>
        </div>
    );
};

export default ExpenseList;
