import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const MonthlyTrendChart = ({ data }) => {
    return (
        <div
            style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                marginTop: "30px",
                height: "400px",
            }}
        >
            <h2>Monthly Income vs Expense</h2>

            <ResponsiveContainer width="100%" height="90%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="month" />

                    <YAxis />

                    <Tooltip />

                    <Legend />

                    <Line
                        type="monotone"
                        dataKey="income"
                        stroke="#00C49F"
                        strokeWidth={3}
                    />

                    <Line
                        type="monotone"
                        dataKey="expense"
                        stroke="#FF8042"
                        strokeWidth={3}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default MonthlyTrendChart;