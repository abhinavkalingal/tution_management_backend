const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant", required: true },
  branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },
  amount: { type: Number, required: true },
  dueDate: { type: Date },
  status: { type: String, enum: ["PAID", "UNPAID", "OVERDUE"], default: "UNPAID" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Invoice", invoiceSchema);
