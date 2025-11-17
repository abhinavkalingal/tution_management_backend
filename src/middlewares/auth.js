const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ message: "No token provided" });

    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user || !user.isActive)
      return res.status(401).json({ message: "Unauthorized" });

    req.user = {
      id: user._id,
      role: user.role,
      tenantId: user.tenantId,
      branchId: user.branchId,
    };

    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid/Expired token" });
  }
};
