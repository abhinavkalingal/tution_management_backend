// src/controllers/ownerController.js
const Branch = require("../models/Branch");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

// create branch
exports.createBranch = async (req, res) => {
  try {
    const tenantId = req.user.tenantId;
    if (!tenantId) return res.status(400).json({ message: "Tenant context missing" });

    const { name, code, address, phone, email, openingHours, metadata } = req.body;
    if (!name) return res.status(400).json({ message: "Branch name required" });

    const branch = await Branch.create({ tenantId, name, code, address, phone, email, openingHours, metadata });
    res.status(201).json({ message: "Branch created", branch });
  } catch (err) {
    console.error("createBranch:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.listBranches = async (req, res) => {
  try {
    const tenantId = req.user.tenantId;
    const branches = await Branch.find({ tenantId });
    res.json({ branches });
  } catch (err) {
    console.error("listBranches:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.getBranch = async (req, res) => {
  try {
    const tenantId = req.user.tenantId;
    const branch = await Branch.findOne({ _id: req.params.id, tenantId });
    if (!branch) return res.status(404).json({ message: "Branch not found" });
    res.json({ branch });
  } catch (err) {
    console.error("getBranch:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.updateBranch = async (req, res) => {
  try {
    const tenantId = req.user.tenantId;
    const branch = await Branch.findOneAndUpdate({ _id: req.params.id, tenantId }, { $set: req.body }, { new: true });
    if (!branch) return res.status(404).json({ message: "Branch not found" });
    res.json({ message: "Branch updated", branch });
  } catch (err) {
    console.error("updateBranch:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.setBranchStatus = async (req, res) => {
  try {
    const tenantId = req.user.tenantId;
    const { isActive } = req.body;
    if (typeof isActive !== "boolean") return res.status(400).json({ message: "isActive boolean required" });

    const branch = await Branch.findOneAndUpdate({ _id: req.params.id, tenantId }, { isActive }, { new: true });
    if (!branch) return res.status(404).json({ message: "Branch not found" });
    res.json({ message: "Branch status updated", branch });
  } catch (err) {
    console.error("setBranchStatus:", err);
    res.status(500).json({ message: err.message });
  }
};

// create branch admin
exports.createBranchAdmin = async (req, res) => {
  try {
    const tenantId = req.user.tenantId;
    const { name, email, phone, branchId, password } = req.body;
    if (!email || !branchId) return res.status(400).json({ message: "email and branchId required" });

    const branch = await Branch.findOne({ _id: branchId, tenantId });
    if (!branch) return res.status(404).json({ message: "Branch not found for tenant" });

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User email exists" });

    const plain = password || crypto.randomBytes(4).toString("hex");
    const hashed = await bcrypt.hash(plain, 10);

    const user = await User.create({ tenantId, branchId, name, email, phone, password: hashed, role: "ADMIN", isActive: true });
    // You should send email in production
    res.status(201).json({ message: "Branch admin created", user: { id: user._id, email: user.email }, password: plain });
  } catch (err) {
    console.error("createBranchAdmin:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.listAdmins = async (req, res) => {
  try {
    const tenantId = req.user.tenantId;
    const { branchId } = req.query;
    const query = { tenantId, role: "ADMIN" };
    if (branchId) query.branchId = branchId;
    const admins = await User.find(query).select("-password");
    res.json({ admins });
  } catch (err) {
    console.error("listAdmins:", err);
    res.status(500).json({ message: err.message });
  }
};
