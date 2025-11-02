import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Save, Wallet } from "lucide-react";
import "./AddTransaction.css";

const AddTransaction = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    type: "",
    category: "",
    amount: "",
    description: "",
    date: "",
  });
  const [error, setError] = useState("");

  const categories = [
    "Food",
    "Transportation",
    "Entertainment",
    "Shopping",
    "Bills",
    "Health",
    "Salary",
    "Investment",
    "Other",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "amount" && value && !/^\d*\.?\d*$/.test(value)) return;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { type, category, amount, description, date } = form;
    const today = new Date().toISOString().split("T")[0];

    if (!type || !category || !amount || !description || !date) {
      setError("All fields are required!");
      return;
    }

    if (isNaN(amount) || Number(amount) <= 0) {
      setError("Amount must be a valid positive number.");
      return;
    }

    if (date > today) {
      setError("Date cannot be in the future.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/transactions", form);
      navigate("/");
    } catch (err) {
      setError("Failed to add transaction. Try again.");
    }
  };

  return (
    <div className="add-transaction-page">
      <div className="add-transaction-card">
        {/* Header */}
        <div className="header">
          <div className="logo">
            <Wallet className="wallet-icon" />
            <h1>Expense Tracker</h1>
          </div>
          <button onClick={() => navigate("/")} className="back-btn">
            <ArrowLeft size={16} />
            Back to Dashboard
          </button>
        </div>

        <p className="subtitle">Add your income or expense with ease ✨</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="transaction-form">
          <div className="form-group">
            <label>Transaction Type</label>
            <select name="type" value={form.type} onChange={handleChange}>
              <option value="">Select Type</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div className="form-group">
            <label>Category</label>
            <select name="category" value={form.category} onChange={handleChange}>
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Amount (₹)</label>
            <input
              type="text"
              name="amount"
              placeholder="Enter amount"
              value={form.amount}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              placeholder="e.g., Paid rent, received salary..."
              value={form.description}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="save-btn">
            <Save size={18} />
            Save Transaction
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;
