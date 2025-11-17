const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    tenantId: { type: mongoose.Types.ObjectId, ref: "Tenant" },
    branchId: { type: mongoose.Types.ObjectId, ref: "Branch" },

    name: { type: String },
    email: { type: String, required: true, unique: true },
    phone: { type: String },

    password: { type: String, required: true },

    role: {
      type: String,
      enum: ["SELLER", "OWNER", "ADMIN", "TEACHER", "STUDENT"],
      default: "STUDENT",
    },

    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
