// src/models/Branch.js
const mongoose = require("mongoose");

const BranchSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant", required: true, index: true },
  name: { type: String, required: true },
  code: { type: String },
  address: { type: String },
  phone: { type: String },
  email: { type: String },
  openingHours: { type: Object, default: {} },
  metadata: { type: Object, default: {} },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.models.Branch || mongoose.model("Branch", BranchSchema);
