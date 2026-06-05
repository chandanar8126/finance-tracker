const Transaction = require("../models/Transaction");

// Dashboard Summary
const getSummary = async (req, res) => {
    try {
        const transactions = await Transaction.find({
            user: req.user.id,
        });

        let totalIncome = 0;
        let totalExpense = 0;

        transactions.forEach((transaction) => {
            if (transaction.type === "income") {
                totalIncome += transaction.amount;
            } else {
                totalExpense += transaction.amount;
            }
        });

        const balance = totalIncome - totalExpense;

        const savingsRate =
            totalIncome > 0
                ? ((balance / totalIncome) * 100).toFixed(2)
                : 0;

        res.json({
            totalIncome,
            totalExpense,
            balance,
            savingsRate,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching dashboard summary",
            error: error.message,
        });
    }
};

// Category Breakdown
const getCategoryBreakdown = async (req, res) => {
    try {
        const transactions = await Transaction.find({
            user: req.user.id,
            type: "expense",
        });

        const breakdown = {};

        transactions.forEach((transaction) => {
            const category = transaction.category;

            if (!breakdown[category]) {
                breakdown[category] = 0;
            }

            breakdown[category] += transaction.amount;
        });

        const result = Object.keys(breakdown).map((category) => ({
            category,
            amount: breakdown[category],
        }));

        res.json(result);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching category breakdown",
            error: error.message,
        });
    }
};

// Recent Transactions
const getRecentTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({
            user: req.user.id,
        })
            .sort({ createdAt: -1 })
            .limit(5);

        res.json(transactions);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching recent transactions",
            error: error.message,
        });
    }
};

// Monthly Trend
const getMonthlyTrend = async (req, res) => {
    try {
        const transactions = await Transaction.find({
            user: req.user.id,
        });

        const monthlyData = {};

        transactions.forEach((transaction) => {
            const date = new Date(transaction.date);

            const monthYear = `${date.getMonth() + 1}-${date.getFullYear()}`;

            if (!monthlyData[monthYear]) {
                monthlyData[monthYear] = {
                    income: 0,
                    expense: 0,
                };
            }

            if (transaction.type === "income") {
                monthlyData[monthYear].income += transaction.amount;
            } else {
                monthlyData[monthYear].expense += transaction.amount;
            }
        });

        const result = Object.keys(monthlyData).map((month) => ({
            month,
            income: monthlyData[month].income,
            expense: monthlyData[month].expense,
        }));

        res.json(result);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching monthly trend",
            error: error.message,
        });
    }
};

module.exports = {
    getSummary,
    getCategoryBreakdown,
    getRecentTransactions,
    getMonthlyTrend,
};