const RecentTransactions = ({ transactions }) => {
    return (
        <div
            style={{
                background: "#fff",
                padding: "25px",
                borderRadius: "18px",
                boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                marginTop: "30px",
            }}
        >
            <h2>Recent Transactions</h2>

            {transactions.length === 0 ? (
                <p>No transactions found.</p>
            ) : (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "15px",
                    }}
                >
                    {transactions.map((transaction) => (
                        <div
                            key={transaction._id}
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: "15px",
                                borderRadius: "12px",
                                background: "#f8fafc",
                            }}
                        >
                            <div>
                                <h3 style={{ margin: 0 }}>
                                    {transaction.title}
                                </h3>

                                <p
                                    style={{
                                        margin: "5px 0 0",
                                        color: "#6b7280",
                                    }}
                                >
                                    {transaction.category}
                                </p>
                            </div>

                            <div
                                style={{
                                    textAlign: "right",
                                }}
                            >
                                <p
                                    style={{
                                        margin: 0,
                                        fontWeight: "bold",
                                        fontSize: "18px",
                                        color:
                                            transaction.type === "income"
                                                ? "#16a34a"
                                                : "#dc2626",
                                    }}
                                >
                                    {transaction.type === "income"
                                        ? "+"
                                        : "-"}
                                    ₹ {transaction.amount}
                                </p>

                                <small
                                    style={{
                                        color: "#6b7280",
                                    }}
                                >
                                    {transaction.type}
                                </small>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RecentTransactions;