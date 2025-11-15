const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.register = async (req, res) => {
  try {
    const { name, email, password, role, branchId } = req.body;

    const user = await User.create({
      name,
      email,
      password,
      role,
      branchId,
    });

    res.json({
      success: true,
      token: generateToken(user._id, user.role),
      user,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    res.json({
      success: true,
      token: generateToken(user._id, user.role),
      user,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
