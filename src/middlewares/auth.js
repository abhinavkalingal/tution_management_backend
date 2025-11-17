// src/middlewares/auth.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  try {
    const header = req.headers.authorization || req.headers.Authorization;
    if (!header || !header.startsWith("Bearer ")) return res.status(401).json({ message: "No token provided" });

    const token = header.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET || "change_this_secret");
    // attach user basic info (don't fetch password)
    const user = await User.findById(payload.id).select("-password");
    if (!user) return res.status(401).json({ message: "Invalid token" });

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized", error: err.message });
  }
};
