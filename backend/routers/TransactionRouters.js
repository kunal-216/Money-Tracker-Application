import express from "express";
import { postTransactions, showTransactions } from "../controllers/TransactionControllers.js";

const router = express.Router();

router.get('/transactions', showTransactions);
router.post('/transaction', postTransactions);

export default router;