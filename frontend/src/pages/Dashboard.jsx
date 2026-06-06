import { useEffect, useState } from "react";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

import Sidebar from "../components/Sidebar";
import SummaryCard from "../components/SummaryCard";
import RecentTransactions from "../components/RecentTransactions";
import CategoryPieChart from "../components/CategoryPieChart";
import MonthlyTrendChart from "../components/MonthlyTrendChart";

const Dashboard = () => {
    const { logout } = useAuth();

    const [summary, setSummary] = useState(null);
    const [recentTransactions, setRecentTransactions] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [monthlyTrend, setMonthlyTrend] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const summaryRes = await API.get("/dashboard/summary");
                setSummary(summaryRes.data);

                const recentRes = await API.get("/dashboard/recent");
                setRecentTransactions(recentRes.data);

                const categoryRes = await API.get(
                    "/dashboard/category-breakdown"
                );
                setCategoryData(categoryRes.data);

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
        <div
            style={{
                display: "flex",
                minHeight: "100vh",
                background: "#eef2ff",
            }}
        >
            <Sidebar />

            <div
                style={{
                    flex: 1,
                    padding: "30px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "30px",
                    }}
                >
                    <div>
                        <h1
                            style={{
                                margin: 0,
                                fontSize: "42px",
                                color: "#111827",
                            }}
                        >
                            Welcome Back 👋
                        </h1>

                        <p
                            style={{
                                color: "#6b7280",
                                marginTop: "6px",
                                fontSize: "18px",
                            }}
                        >
                            Track and manage your finances
                        </p>
                    </div>

                    <button
                        onClick={handleLogout}
                        style={{
                            background: "#ef4444",
                            color: "white",
                            border: "none",
                            padding: "12px 22px",
                            borderRadius: "10px",
                            cursor: "pointer",
                            fontWeight: "bold",
                            fontSize: "15px",
                        }}
                    >
                        Logout
                    </button>
                </div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(220px, 1fr))",
                        gap: "20px",
                    }}
                >
                    <SummaryCard
                        title="Total Income"
                        value={`₹ ${summary.totalIncome}`}
                        color="#22c55e"
                    />

                    <SummaryCard
                        title="Total Expense"
                        value={`₹ ${summary.totalExpense}`}
                        color="#ef4444"
                    />

                    <SummaryCard
                        title="Balance"
                        value={`₹ ${summary.balance}`}
                        color="#3b82f6"
                    />

                    <SummaryCard
                        title="Savings Rate"
                        value={`${summary.savingsRate}%`}
                        color="#8b5cf6"
                    />
                </div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "20px",
                        marginTop: "30px",
                    }}
                >
                    <CategoryPieChart data={categoryData} />

                    <MonthlyTrendChart data={monthlyTrend} />
                </div>

                <RecentTransactions
                    transactions={recentTransactions}
                />
            </div>
        </div>
    );
};

export default Dashboard;