import { useEffect, useState } from "react";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";
import RecentTransactions from "../components/RecentTransactions";
import CategoryPieChart from "../components/CategoryPieChart";
import MonthlyTrendChart from "../components/MonthlyTrendChart";

const Dashboard = () => {
    const { logout } = useAuth();

    const [summary, setSummary] = useState(null);
    const [recentTransactions, setRecentTransactions] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [monthlyTrend, setMonthlyTrend] = useState([]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // Summary
                const summaryRes = await API.get("/dashboard/summary");
                setSummary(summaryRes.data);

                // Recent Transactions
                const recentRes = await API.get("/dashboard/recent");
                setRecentTransactions(recentRes.data);

                // Category Breakdown
                const categoryRes = await API.get(
                    "/dashboard/category-breakdown"
                );
                setCategoryData(categoryRes.data);

                // Monthly Trend
                const trendRes = await API.get(
                    "/dashboard/monthly-trend"
                );

                setMonthlyTrend(trendRes.data);

            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const handleLogout = () => {
        logout();
        window.location.href = "/login";
    };

    if (loading) {
        return (
            <h2 style={{ padding: "20px" }}>
                Loading Dashboard...
            </h2>
        );
    }

    return (
        <div style={{ padding: "30px" }}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "30px",
                }}
            >
                <h1>FinTrack Dashboard</h1>

                <div
                    style={{
                        display: "flex",
                        gap: "10px",
                    }}
                >
                    <button
                        onClick={() =>
                            (window.location.href = "/transactions")
                        }
                    >
                        Transactions
                    </button>

                    <button onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: "20px",
                }}
            >
                <div
                    style={{
                        background: "#fff",
                        padding: "20px",
                        borderRadius: "12px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    }}
                >
                    <h3>Total Income</h3>
                    <h2>₹ {summary.totalIncome}</h2>
                </div>

                <div
                    style={{
                        background: "#fff",
                        padding: "20px",
                        borderRadius: "12px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    }}
                >
                    <h3>Total Expense</h3>
                    <h2>₹ {summary.totalExpense}</h2>
                </div>

                <div
                    style={{
                        background: "#fff",
                        padding: "20px",
                        borderRadius: "12px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    }}
                >
                    <h3>Balance</h3>
                    <h2>₹ {summary.balance}</h2>
                </div>

                <div
                    style={{
                        background: "#fff",
                        padding: "20px",
                        borderRadius: "12px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    }}
                >
                    <h3>Savings Rate</h3>
                    <h2>{summary.savingsRate}%</h2>
                </div>
            </div>

            <RecentTransactions
                transactions={recentTransactions}
            />

            <CategoryPieChart
                data={categoryData}
            />
            <MonthlyTrendChart
                data={monthlyTrend}
            />
        </div>
    );
};

export default Dashboard;