import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { ArrowLeft, BarChart3, Wallet } from "lucide-react";
import "./Analytics.css";

const COLORS = ["#4CAF50", "#F44336", "#FF9800", "#2196F3", "#9C27B0"];

const Analytics = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({ income: 0, expense: 0 });

  const getTransactions = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/transactions");
      const details = data.data?.details || [];

      setTransactions(details);

      // Summaries
      const income = details
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);

      const expense = details
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);

      setSummary({ income, expense });
    } catch (err) {
      console.error("Error fetching analytics:", err);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  // Prepare category-wise data
  const categoryData = transactions.reduce((acc, t) => {
    const existing = acc.find((item) => item.category === t.category);
    if (existing) {
      existing.amount += t.amount;
    } else {
      acc.push({ category: t.category, amount: t.amount });
    }
    return acc;
  }, []);

  return (
    <div className="analytics-container">
      {/* Header */}
      <div className="analytics-header">
        <div className="title">
          <Wallet className="wallet-icon" />
          <h1>Expense Tracker Analytics</h1>
        </div>

        <button onClick={() => navigate("/")} className="back-btn">
          <ArrowLeft size={16} /> Back to Dashboard
        </button>
      </div>

      {/* Summary Section */}
      <div className="summary-section">
        <div className="summary-card income-card">
          <h3>Total Income</h3>
          <p>₹{summary.income}</p>
        </div>
        <div className="summary-card expense-card">
          <h3>Total Expense</h3>
          <p>₹{summary.expense}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        <div className="chart-box">
          <h3>
            <BarChart3 size={18} /> Category-wise Expense Breakdown
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount" fill="#2196F3" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h3>Overall Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="amount"
                nameKey="category"
                outerRadius={120}
                label
              >
                {categoryData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
