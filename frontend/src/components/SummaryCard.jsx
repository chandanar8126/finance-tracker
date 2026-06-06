const SummaryCard = ({ title, value, color }) => {
    return (
        <div
            style={{
                background: "#fff",
                padding: "24px",
                borderRadius: "18px",
                boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                borderLeft: `6px solid ${color}`,
            }}
        >
            <p
                style={{
                    margin: 0,
                    color: "#6b7280",
                    fontWeight: "600",
                }}
            >
                {title}
            </p>

            <h2
                style={{
                    marginTop: "10px",
                    marginBottom: 0,
                    fontSize: "32px",
                }}
            >
                {value}
            </h2>
        </div>
    );
};

export default SummaryCard;