const mongoose = require("mongoose");

const BranchSchema = new mongoose.Schema(
  {
    tenantId: { type: mongoose.Types.ObjectId, required: true },

    name: { type: String, required: true },
    code: { type: String },

    address: { type: String },
    phone: { type: String },
    email: { type: String },

    openingHours: { type: String },

    isActive: { type: Boolean, default: true },
    metadata: { type: Object, default: {} }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Branch", BranchSchema);
