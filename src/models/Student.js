const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema(
  {
    tenantId: { type: mongoose.Types.ObjectId, required: true },
    branchId: { type: mongoose.Types.ObjectId, required: true },

    name: { type: String, required: true },

    admissionNo: { type: String, unique: true, sparse: true },
    phone: { type: String },

    parentName: { type: String },
    parentPhone: { type: String },

    courseId: { type: mongoose.Types.ObjectId, ref: "Course" },
    batchId: { type: mongoose.Types.ObjectId, ref: "Batch" },

    joinDate: { type: Date, default: Date.now },

    isActive: { type: Boolean, default: true },

    metadata: { type: Object, default: {} }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", StudentSchema);
