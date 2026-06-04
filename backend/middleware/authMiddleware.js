const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.header("Authorization");

    console.log("AUTH HEADER:", authHeader);

    if (!authHeader) {
        return res.status(401).json({ message: "No token provided" });
    }

    // FIX: robust token cleaning
    const token = authHeader.replace("Bearer ", "").trim();

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.log("JWT ERROR:", err.message);
        return res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = authMiddleware;