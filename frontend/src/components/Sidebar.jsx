import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <div
            style={{
                width: "260px",
                background:
                    "linear-gradient(180deg, #4f46e5 0%, #312e81 100%)",
                color: "white",
                minHeight: "100vh",
                padding: "25px",
                display: "flex",
                flexDirection: "column",
                boxSizing: "border-box",
            }}
        >
            <div>
                <h1
                    style={{
                        margin: 0,
                        fontSize: "34px",
                    }}
                >
                    💰 FinTrack
                </h1>

                <p
                    style={{
                        opacity: 0.8,
                        marginTop: "8px",
                    }}
                >
                    Smart Finance Manager
                </p>
            </div>

            <div
                style={{
                    marginTop: "40px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                }}
            >
                <Link
                    to="/"
                    style={{
                        color: "white",
                        textDecoration: "none",
                        padding: "14px",
                        borderRadius: "12px",
                        background: "rgba(255,255,255,0.15)",
                        fontWeight: "600",
                    }}
                >
                    📊 Dashboard
                </Link>

                <Link
                    to="/transactions"
                    style={{
                        color: "white",
                        textDecoration: "none",
                        padding: "14px",
                        borderRadius: "12px",
                        background: "rgba(255,255,255,0.08)",
                        fontWeight: "600",
                    }}
                >
                    💳 Transactions
                </Link>
            </div>

            <div
                style={{
                    marginTop: "auto",
                    padding: "15px",
                    borderRadius: "12px",
                    background: "rgba(255,255,255,0.1)",
                }}
            >
                <h4
                    style={{
                        marginTop: 0,
                    }}
                >
                    Financial Health
                </h4>

                <p
                    style={{
                        marginBottom: 0,
                        opacity: 0.8,
                        fontSize: "14px",
                    }}
                >
                    Keep tracking your income and expenses regularly.
                </p>
            </div>
        </div>
    );
};

export default Sidebar;