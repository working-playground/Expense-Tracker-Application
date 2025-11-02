import express from "express";
import {
  createTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transaction.controller.js";

import {
  validateBody,
  validateQuery,
  validateParams,
} from "../validations/common.validation.js";

import {
  transactionBodySchema,
  transactionQuerySchema,
  idParamSchema,
} from "../validations/transaction.validation.js";

const router = express.Router();
router.post("/", validateBody(transactionBodySchema), createTransaction);
router.get("/", validateQuery(transactionQuerySchema), getTransactions);
router.get("/:id", validateParams(idParamSchema), getTransactionById);
router.put(
  "/:id",
  validateParams(idParamSchema),
  validateBody(transactionBodySchema),
  updateTransaction
);
router.delete("/:id", validateParams(idParamSchema), deleteTransaction);

export default router;
