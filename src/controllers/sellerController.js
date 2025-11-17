// src/controllers/sellerController.js
const Tenant = require("../models/Tenant");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// create tenant (and optional owner)
exports.createTenant = async (req, res) => {
  try {
    const { name, email, phone, address, ownerEmail, ownerPassword } = req.body;
    if (!name) return res.status(400).json({ message: "Tenant name required" });

    // create tenant
    const tenant = await Tenant.create({
      name,
      email,
      phone,
      address,
      status: "ACTIVE"
    });

    // if ownerEmail provided, create owner user
    let ownerResult = null;
    if (ownerEmail) {
      const existing = await User.findOne({ email: ownerEmail });
      if (existing) {
        ownerResult = { message: "Owner email already exists", email: ownerEmail };
      } else {
        const plainPass = ownerPassword || Math.random().toString(36).slice(-8);
        const hashed = await bcrypt.hash(plainPass, 10);
        const owner = await User.create({
          name: `${name} Owner`,
          email: ownerEmail,
          password: hashed,
          role: "OWNER",
          tenantId: tenant._id,
          isActive: true
        });
        ownerResult = { id: owner._id, email: owner.email, defaultPassword: plainPass };
        // NOTE: in prod you should send email instead of returning password
      }
    }

    res.status(201).json({ message: "Tenant created", tenant, owner: ownerResult });
  } catch (err) {
    console.error("createTenant:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.listTenants = async (req, res) => {
  try {
    const tenants = await Tenant.find();
    res.json({ tenants });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getTenant = async (req, res) => {
  try {
    const tenant = await Tenant.findById(req.params.id);
    if (!tenant) return res.status(404).json({ message: "Tenant not found" });
    res.json({ tenant });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateTenant = async (req, res) => {
  try {
    const tenant = await Tenant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: "Updated", tenant });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.assignPlan = async (req, res) => {
  try {
    const tenant = await Tenant.findByIdAndUpdate(req.params.id, { plan: req.body }, { new: true });
    res.json({ message: "Plan updated", tenant });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.setStatus = async (req, res) => {
  try {
    const tenant = await Tenant.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json({ message: "Status updated", tenant });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
