import React, { useEffect, useState } from "react";
import axios from "axios";

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;  // Prevents API call if token is missing
    axios
      .get("http://localhost:5000/api/expenses", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setExpenses(response.data))
      .catch((error) => console.error(error));
  }, [token]);  // ✅ Include `token` in the dependency array

  return (
    <div className="container mt-5">
      <h2>Expenses</h2>
      <ul className="list-group">
        {expenses.map((expense) => (
          <li key={expense.id} className="list-group-item">
            {expense.category} - ${expense.amount} on {expense.date}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Expenses;
