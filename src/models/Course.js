const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
  {
    tenantId: { type: mongoose.Types.ObjectId, required: true },
    branchId: { type: mongoose.Types.ObjectId, required: true },

    name: { type: String, required: true },
    description: { type: String },
    duration: { type: String }, 
    subjects: { type: [String], default: [] },

    isActive: { type: Boolean, default: true },
    metadata: { type: Object, default: {} }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", CourseSchema);
