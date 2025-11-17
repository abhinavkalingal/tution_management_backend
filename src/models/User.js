// src/models/User.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant", index: true, required: false },
  branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: false },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  phone: { type: String },
  password: { type: String, required: true },
  role: { type: String, enum: ["SELLER","OWNER","ADMIN","TEACHER","STUDENT"], default: "STUDENT" },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
