import * as transactionService from "../services/transaction.service.js";
import {
  successResponse,
  createdResponse,
  errorResponse,
} from "../utils/responseHandler.js";

export async function createTransaction(req, res) {
  try {
    const result = await transactionService.addTransaction(req.body);
    return createdResponse(res, "Transaction created successfully", {
      details: result,
    });
  } catch (err) {
    return errorResponse(res, err.message);
  }
}

export async function getTransactions(req, res) {
  try {
    const { page, limit, type, category, startDate, endDate } = req.query;

    const result = await transactionService.listTransactions({
      page: Number(page) || 1,
      limit: Number(limit) || 10,
      type,
      category,
      startDate,
      endDate,
    });

    return successResponse(res, "Transactions fetched successfully", result);
  } catch (err) {
    return errorResponse(res, err.message, 500);
  }
}

export async function getTransactionById(req, res) {
  try {
    const result = await transactionService.getTransaction(req.params.id);
    return successResponse(res, "Transaction fetched successfully", {
      details: result,
    });
  } catch (err) {
    return errorResponse(res, err.message, 404);
  }
}

export async function updateTransaction(req, res) {
  try {
    const result = await transactionService.modifyTransaction(
      req.params.id,
      req.body
    );
    return successResponse(res, "Transaction updated successfully", {
      details: result,
    });
  } catch (err) {
    return errorResponse(res, err.message);
  }
}

export async function deleteTransaction(req, res) {
  try {
    await transactionService.removeTransaction(req.params.id);
    return successResponse(res, "Transaction deleted successfully");
  } catch (err) {
    return errorResponse(res, err.message, 404);
  }
}
