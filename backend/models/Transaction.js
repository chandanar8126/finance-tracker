const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        amount: {
            type: Number,
            required: true,
            min: 0,
        },

        category: {
            type: String,
            required: true,
            enum: [
                "Food",
                "Transport",
                "Entertainment",
                "Shopping",
                "Bills",
                "Healthcare",
                "Education",
                "Salary",
                "Freelance",
                "Other",
            ],
        },

        type: {
            type: String,
            required: true,
            enum: ["income", "expense"],
        },

        date: {
            type: Date,
            default: Date.now,
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);