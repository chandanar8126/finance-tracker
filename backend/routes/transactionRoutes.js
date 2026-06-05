const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    addTransaction,
    getTransactions,
    updateTransaction,
    deleteTransaction,
} = require("../controllers/transactionController");

// Create Transaction
router.post("/", authMiddleware, addTransaction);

// Get All Transactions
router.get("/", authMiddleware, getTransactions);

// Update Transaction
router.put("/:id", authMiddleware, updateTransaction);

// Delete Transaction
router.delete("/:id", authMiddleware, deleteTransaction);

module.exports = router;