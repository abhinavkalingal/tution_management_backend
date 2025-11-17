const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema(
  {
    tenantId: { type: mongoose.Types.ObjectId, required: true },
    branchId: { type: mongoose.Types.ObjectId, required: true },

    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String },

    salary: { type: Number, default: 0 },
    subjects: { type: [String], default: [] },

    isActive: { type: Boolean, default: true },
    metadata: { type: Object, default: {} }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Teacher", TeacherSchema);
