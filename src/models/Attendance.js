const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema(
  {
    tenantId: { type: mongoose.Types.ObjectId, required: true, index: true },
    branchId: { type: mongoose.Types.ObjectId, required: true, index: true },

    targetType: { type: String, enum: ["STUDENT", "TEACHER"], required: true },
    targetId: { type: mongoose.Types.ObjectId, required: true, index: true },

    batchId: { type: mongoose.Types.ObjectId, ref: "Batch" },

    date: { type: Date, required: true, index: true },
    status: { type: String, enum: ["PRESENT", "ABSENT", "LEAVE"], default: "PRESENT" },

    note: { type: String },
    markedBy: { type: mongoose.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

AttendanceSchema.index(
  { tenantId: 1, targetId: 1, date: 1, targetType: 1 },
  { unique: true }
);

module.exports = mongoose.model("Attendance", AttendanceSchema);
