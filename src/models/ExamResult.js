const mongoose = require("mongoose");

const ExamResultSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, required: true },
  branchId: { type: mongoose.Schema.Types.ObjectId, required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, required: true },
  examId: { type: mongoose.Schema.Types.ObjectId, required: true },
  score: { type: Number, required: true },
  remarks: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("ExamResult", ExamResultSchema);
