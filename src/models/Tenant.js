const mongoose = require("mongoose");

const TenantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
    address: { type: String },

    logoUrl: { type: String },
    domain: { type: String },

    plan: {
      name: { type: String, default: "free" },
      price: { type: Number, default: 0 },
      maxBranches: { type: Number, default: 1 },
      maxStudents: { type: Number, default: 100 }
    },

    planExpiresAt: { type: Date },

    status: {
      type: String,
      enum: ["ACTIVE", "SUSPENDED", "DELETED"],
      default: "ACTIVE"
    },

    metadata: { type: Object, default: {} }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tenant", TenantSchema);
