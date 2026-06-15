import express from "express";
import * as db from "../db/queries.js";

const router = express.Router();

router.get("/", db.getExpenses);
router.get("/:id", db.getExpenseById);
router.post("/", db.createExpense);
router.put("/:id", db.updateExpense);
router.delete("/:id", db.deleteExpense);

export default router;

