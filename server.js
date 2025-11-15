require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("./config/db");
const errorMiddleware = require("./middleware/errorMiddleware");

// 🚀 ENABLE CORS FOR YOUR FLUTTER WEB APP
app.use(cors({
  origin: "*",          // allow all for testing
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type, Authorization",
}));

// Connect Database
connectDB();

// Middleware
app.use(express.json());

// API Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/students", require("./routes/students"));
app.use("/api/teachers", require("./routes/teachers"));
app.use("/api/courses", require("./routes/courses"));
app.use("/api/assignments", require("./routes/assignments"));
app.use("/api/notifications", require("./routes/notifications"));
app.use('/api/branches', require('./routes/branches'));
app.use("/api/attendance", require("./routes/attendance"));
app.use("/api/exams", require("./routes/exams"));
app.use("/api/reports", require("./routes/reports"));
app.use("/api/fees", require("./routes/fees"));

// Health Check
app.get("/", (req, res) =>
  res.json({ message: "API running" })
);

// Error Middleware
app.use(errorMiddleware);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
