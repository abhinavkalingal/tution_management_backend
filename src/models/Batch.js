const mongoose = require("mongoose");

const BatchSchema = new mongoose.Schema(
  {
    tenantId: { type: mongoose.Types.ObjectId, required: true },
    branchId: { type: mongoose.Types.ObjectId, required: true },

    name: { type: String, required: true },
    courseId: { type: mongoose.Types.ObjectId, ref: "Course" },

    teacherId: { type: mongoose.Types.ObjectId, ref: "Teacher" },

    days: { type: [String], default: [] },
    startTime: { type: String },
    endTime: { type: String },

    isActive: { type: Boolean, default: true },
    metadata: { type: Object, default: {} }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Batch", BatchSchema);
