const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    getSummary,
    getCategoryBreakdown,
    getRecentTransactions,
    getMonthlyTrend,
} = require("../controllers/dashboardController");

router.get("/summary", authMiddleware, getSummary);

router.get(
    "/category-breakdown",
    authMiddleware,
    getCategoryBreakdown
);

router.get(
    "/recent",
    authMiddleware,
    getRecentTransactions
);

router.get(
    "/monthly-trend",
    authMiddleware,
    getMonthlyTrend
);

module.exports = router;