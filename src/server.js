require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// ROUTES
const authRoutes = require("./routes/authRoutes");
const sellerRoutes = require("./routes/sellerRoutes");
const ownerRoutes = require("./routes/ownerRoutes");
const adminRoutes = require("./routes/adminRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const courseRoutes = require("./routes/courseRoutes");

const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());

// DB connect
connectDB();

// API ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/owner", ownerRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/courses", courseRoutes);

app.get("/", (req, res) => {
  res.send("Tuition Centre Backend Running...");
});

// SERVER LISTEN
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
