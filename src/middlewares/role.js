// src/middlewares/role.js
exports.allowRoles = (...roles) => {
  return (req, res, next) => {
    const userRole = req.user && req.user.role;
    if (!userRole) return res.status(403).json({ message: "Role required" });
    if (!roles.includes(userRole)) return res.status(403).json({ message: "Forbidden" });
    next();
  };
};
