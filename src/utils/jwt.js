// src/utils/jwt.js
const jwt = require("jsonwebtoken");

exports.generateToken = (user) => {
  const secret = process.env.JWT_SECRET ;
  const expire = process.env.JWT_EXPIRE ; // default to 7 days
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
      tenantId: user.tenantId,
      branchId: user.branchId,
    },
    secret,
    { expiresIn: expire }
  );
};
