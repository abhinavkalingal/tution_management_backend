// src/models/Tenant.js
const mongoose = require("mongoose");

const TenantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  address: { type: String },
  status: { type: String, enum: ["ACTIVE","INACTIVE"], default: "ACTIVE" },
  plan: { type: Object, default: {} },
  metadata: { type: Object, default: {} },
}, { timestamps: true });

module.exports = mongoose.models.Tenant || mongoose.model("Tenant", TenantSchema);
