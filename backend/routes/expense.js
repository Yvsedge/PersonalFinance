import express from "express";
import * as db from "../db/queries.js";
import verifyToken from "../middleware/auth.js"
import 'dotenv/config';

const router = express.Router();

router.get("/dashboard",verifyToken, db.getAllExpenses);
router.get("/",verifyToken, db.getExpenses);
router.get("/analytics/monthly",verifyToken, db.getMonthly);
router.get("/analytics/daily", verifyToken, db.getDaily);
router.get("/getme",verifyToken, db.getMe);
router.post("/auth/register", db.addUser);
router.post("/auth/login", db.login);
router.post("/auth/google", db.googleLogin);
router.get("/:id",verifyToken, db.getExpenseById);
router.post("/",verifyToken, db.createExpense);
router.put("/:id",verifyToken, db.updateExpense);
router.delete("/:id",verifyToken, db.deleteExpense);


export default router;

