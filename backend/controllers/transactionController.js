const Transaction = require("../models/Transaction");

// CREATE TRANSACTION
const addTransaction = async (req, res) => {
    try {
        const { title, amount, category, type, date } = req.body;

        const transaction = await Transaction.create({
            title,
            amount,
            category,
            type,
            date,
            user: req.user.id,
        });

        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({
            message: "Error creating transaction",
            error: error.message,
        });
    }
};

// GET ALL USER TRANSACTIONS
const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({
            user: req.user.id,
        }).sort({ date: -1 });

        res.json(transactions);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching transactions",
            error: error.message,
        });
    }
};

// UPDATE TRANSACTION
const updateTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findOne({
            _id: req.params.id,
            user: req.user.id,
        });

        if (!transaction) {
            return res.status(404).json({
                message: "Transaction not found",
            });
        }

        const updatedTransaction = await Transaction.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedTransaction);
    } catch (error) {
        res.status(500).json({
            message: "Error updating transaction",
            error: error.message,
        });
    }
};

// DELETE TRANSACTION
const deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findOne({
            _id: req.params.id,
            user: req.user.id,
        });

        if (!transaction) {
            return res.status(404).json({
                message: "Transaction not found",
            });
        }

        await transaction.deleteOne();

        res.json({
            message: "Transaction deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting transaction",
            error: error.message,
        });
    }
};

module.exports = {
    addTransaction,
    getTransactions,
    updateTransaction,
    deleteTransaction,
};