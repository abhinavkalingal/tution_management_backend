const Tenant = require("../models/Tenant");

// Create tenant
exports.createTenant = async (req, res) => {
  try {
    const tenant = await Tenant.create(req.body);
    res.json({ message: "Tenant created", tenant });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// List tenants
exports.listTenants = async (req, res) => {
  try {
    const tenants = await Tenant.find();
    res.json({ tenants });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get tenant
exports.getTenant = async (req, res) => {
  try {
    const tenant = await Tenant.findById(req.params.id);
    res.json({ tenant });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update tenant
exports.updateTenant = async (req, res) => {
  try {
    const tenant = await Tenant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ message: "Updated", tenant });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Assign plan
exports.assignPlan = async (req, res) => {
  try {
    const tenant = await Tenant.findByIdAndUpdate(
      req.params.id,
      { plan: req.body },
      { new: true }
    );
    res.json({ message: "Plan updated", tenant });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Set status
exports.setStatus = async (req, res) => {
  try {
    const tenant = await Tenant.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json({ message: "Status updated", tenant });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = exports;

