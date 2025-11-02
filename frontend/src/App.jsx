import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import AddTransaction from "./pages/AddTransaction";
import Analytics from "./pages/Analytics";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        {/* Navigation Bar */}
        {/* <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-indigo-600 flex items-center gap-1">
            💰 Expense Tracker
          </Link>
          <div className="flex gap-6">
            <Link
              to="/"
              className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
            >
              Dashboard
            </Link>
            <Link
              to="/add"
              className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
            >
              Add Transaction
            </Link>
          </div>
        </nav> */}

        {/* Route content */}
        <main className="p-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddTransaction />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
