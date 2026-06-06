import { useEffect, useState } from "react";
import API from "../services/api";

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);

    const [formData, setFormData] = useState({
        title: "",
        amount: "",
        category: "",
        type: "expense",
    });

    const fetchTransactions = async () => {
        try {
            const res = await API.get("/transactions");
            setTransactions(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await API.post("/transactions", formData);

            setFormData({
                title: "",
                amount: "",
                category: "",
                type: "expense",
            });

            fetchTransactions();
        } catch (error) {
            console.error(error);
        }
    };

    const deleteTransaction = async (id) => {
        try {
            await API.delete(`/transactions/${id}`);
            fetchTransactions();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div style={{ padding: "30px" }}>
            <h1>Transactions</h1>

            <form
                onSubmit={handleSubmit}
                style={{
                    display: "grid",
                    gap: "10px",
                    marginBottom: "30px",
                }}
            >
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                />

                <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                >
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                </select>

                <button type="submit">
                    Add Transaction
                </button>
            </form>

            <table width="100%">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Type</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {transactions.map((t) => (
                        <tr key={t._id}>
                            <td>{t.title}</td>
                            <td>₹ {t.amount}</td>
                            <td>{t.category}</td>
                            <td>{t.type}</td>

                            <td>
                                <button
                                    onClick={() =>
                                        deleteTransaction(t._id)
                                    }
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Transactions;