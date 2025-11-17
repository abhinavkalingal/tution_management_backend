const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, required: true },
  branchId: { type: mongoose.Schema.Types.ObjectId, required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ["PAID", "UNPAID", "PARTIAL"], default: "UNPAID" },
  dueDate: { type: Date },
  description: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Invoice", InvoiceSchema);
