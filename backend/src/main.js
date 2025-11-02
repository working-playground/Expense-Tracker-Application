import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db.config.js";
import transactionRoutes from "../routes/transation.routes.js";

dotenv.config();
await connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", function (req, res) {
  res.json({ message: "Expense Tracker API ✅" });
});

app.use("/api/transactions", transactionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
