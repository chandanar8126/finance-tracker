const RecentTransactions = ({ transactions }) => {
    return (
        <div
            style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                marginTop: "30px",
            }}
        >
            <h2>Recent Transactions</h2>

            {transactions.length === 0 ? (
                <p>No transactions found.</p>
            ) : (
                <table
                    style={{
                        width: "100%",
                        marginTop: "15px",
                        borderCollapse: "collapse",
                    }}
                >
                    <thead>
                        <tr>
                            <th align="left">Title</th>
                            <th align="left">Category</th>
                            <th align="left">Type</th>
                            <th align="left">Amount</th>
                        </tr>
                    </thead>

                    <tbody>
                        {transactions.map((transaction) => (
                            <tr key={transaction._id}>
                                <td>{transaction.title}</td>
                                <td>{transaction.category}</td>
                                <td>{transaction.type}</td>
                                <td>₹ {transaction.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default RecentTransactions;