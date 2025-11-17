const mongoose = require("mongoose");

const FeeSchema = new mongoose.Schema(
  {
    tenantId: { type: mongoose.Types.ObjectId, required: true },
    branchId: { type: mongoose.Types.ObjectId, required: true },

    courseId: { type: mongoose.Types.ObjectId, ref: "Course", required: true },

    title: { type: String, required: true },
    amount: { type: Number, required: true },
    description: { type: String },

    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Fee", FeeSchema);
