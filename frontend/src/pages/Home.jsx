import React, { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Wallet, PlusCircle, Search, BarChart3 } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [filters, setFilters] = useState({
    type: "",
    category: "",
    startDate: "",
    endDate: "",
  });

  const [categories] = useState([
    "Food",
    "Transportation",
    "Entertainment",
    "Shopping",
    "Bills",
    "Health",
    "Salary",
    "Investment",
    "Other",
  ]);

  // ✅ Fetch transactions with optional filters
  const getTransactions = async (filtersToApply = {}) => {
    try {
      const params = { ...filtersToApply };
      Object.keys(params).forEach((key) => {
        if (!params[key]) delete params[key]; // remove empty filters
      });

      const { data } = await axios.get("http://localhost:5000/api/transactions", { params });
      setTransactions(data.data?.details || []);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  // Load all transactions on first load
  useEffect(() => {
    getTransactions();
  }, []);

  // ✅ Handle filter value change
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // ✅ Apply filters (call API)
  const applyFilters = () => {
    getTransactions(filters);
  };

  // ✅ Reset filters and reload all transactions
  const resetFilters = () => {
    const cleared = { type: "", category: "", startDate: "", endDate: "" };
    setFilters(cleared);
    getTransactions(); // fetch all
  };

  return (
    <div className="home-container">
      {/* Header */}
      {/* Header */}
      <div className="home-header">
        <h1>
          <Wallet size={28} color="#fbbf24" />
          Expense Tracker
        </h1>

        <div className="header-actions">
          <button onClick={() => navigate("/add")} className="add-btn-custom">
            <PlusCircle size={18} />
            Add Transaction
          </button>

          <button onClick={() => navigate("/analytics")} className="analytics-btn-custom">
            <BarChart3 size={20} />
            View Analytics
          </button>
        </div>
      </div>

      {/* Filter Section */}
      <div className="filter-box">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-700 mb-4">
          <Search size={18} /> Filter Transactions
        </h2>

        <div className="filter-grid">
          <select name="type" value={filters.type} onChange={handleChange}>
            <option value="">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <select name="category" value={filters.category} onChange={handleChange}>
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>

          <input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={handleChange}
          />

          <input
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={handleChange}
          />
        </div>

        {/* ✅ Apply & Reset Buttons */}
        <div className="filter-actions flex gap-4 mt-4">
          <button
            onClick={applyFilters}
            className="apply-btn bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition"
          >
            Apply
          </button>
          <button
            onClick={resetFilters}
            className="reset-btn bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md transition"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="table-box mt-8">
        <table className="transaction-table w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="py-2 px-4 text-left">#</th>
              <th className="py-2 px-4 text-left">Type</th>
              <th className="py-2 px-4 text-left">Category</th>
              <th className="py-2 px-4 text-left">Amount</th>
              <th className="py-2 px-4 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((t, i) => (
                <tr
                  key={t._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-2 px-4">{i + 1}</td>
                  <td
                    className={`py-2 px-4 font-semibold ${t.type === "income" ? "text-green-600" : "text-red-600"
                      }`}
                  >
                    {t.type}
                  </td>
                  <td className="py-2 px-4">{t.category}</td>
                  <td className="py-2 px-4">₹{t.amount}</td>
                  <td className="py-2 px-4">
                    {new Date(t.date).toLocaleDateString("en-GB")}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-data text-center py-4 text-gray-500">
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

};

export default Home;
