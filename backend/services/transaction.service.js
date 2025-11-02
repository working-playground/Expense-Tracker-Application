import {
  createTransaction,
  getFilteredTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
} from "../persistence/transaction.persistence.js";

export async function addTransaction(data) {
  if (!data.type || !data.amount || !data.category) {
    throw new Error("Type, amount, and category are required");
  }
  return await createTransaction(data);
}

export async function listTransactions(filters) {
  const { page = 1, limit = 10, ...criteria } = filters;
  const { transactions, total } =
    await getFilteredTransactions(criteria, page, limit);

  const totalPages = Math.ceil(total / limit);

  return {
    details: transactions,
    pagination: {
      total,
      totalPages,
      currentPage: page,
      pageSize: limit,
    },
  };
}

export async function getTransaction(id) {
  const transaction = await getTransactionById(id);
  if (!transaction) throw new Error("Transaction not found");
  return transaction;
}

export async function modifyTransaction(id, data) {
  const updated = await updateTransaction(id, data);
  if (!updated) throw new Error("Transaction not found or not updated");
  return updated;
}

export async function removeTransaction(id) {
  const deleted = await deleteTransaction(id);
  if (!deleted) throw new Error("Transaction not found");
  return deleted;
}
