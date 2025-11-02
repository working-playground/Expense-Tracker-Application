import Transaction from "../models/transaction.model.js";

export async function createTransaction(data) {
  return await Transaction.create(data);
}

export async function getFilteredTransactions(filters, page, limit) {
  const skip = (page - 1) * limit;
  const query = {};

  if (filters.type) query.type = filters.type;
  if (filters.category) query.category = filters.category;
  if (filters.startDate && filters.endDate) {
    query.date = {
      $gte: new Date(filters.startDate),
      $lte: new Date(filters.endDate),
    };
  } else if (filters.startDate) {
    query.date = { $gte: new Date(filters.startDate) };
  } else if (filters.endDate) {
    query.date = { $lte: new Date(filters.endDate) };
  }

  const [transactions, total] = await Promise.all([
    Transaction.find(query).sort({ date: -1 }).skip(skip).limit(limit),
    Transaction.countDocuments(query),
  ]);

  return { transactions, total };
}

export async function getTransactionById(id) {
  return await Transaction.findById(id);
}

export async function updateTransaction(id, data) {
  return await Transaction.findByIdAndUpdate(id, data, { new: true });
}

export async function deleteTransaction(id) {
  return await Transaction.findByIdAndDelete(id);
}
