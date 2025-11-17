const Fee = require("../models/Fee");
const Invoice = require("../models/Invoice");
const Student = require("../models/Student");

// create fee structure
exports.createFeeStructure = async (req, res) => {
  try {
    const tenantId = req.user.tenantId;
    const branchId = req.user.branchId;
    const { title, amount, courseId, description } = req.body;
    if (!title || !amount || !courseId) return res.status(400).json({ message: "title,amount,courseId required" });

    const fee = await Fee.create({ tenantId, branchId, title, amount, courseId, description });
    res.status(201).json({ message: "Fee structure created", fee });
  } catch (err) {
    console.error("createFeeStructure:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.listFeeStructures = async (req, res) => {
  try {
    const tenantId = req.user.tenantId;
    const branchId = req.user.branchId;
    const fees = await Fee.find({ tenantId, branchId }).populate("courseId");
    res.json({ fees });
  } catch (err) {
    console.error("listFeeStructures:", err);
    res.status(500).json({ message: err.message });
  }
};

// create invoice
exports.createInvoice = async (req, res) => {
  try {
    const { studentId, amount, dueDate, feeId, courseId } = req.body;
    const tenantId = req.user.tenantId;
    const branchId = req.user.branchId;

    if (!studentId || !amount) return res.status(400).json({ message: "studentId & amount required" });

    const invoiceNo = "INV-" + Date.now();
    const invoice = await Invoice.create({
      tenantId, branchId, studentId, feeStructureId: feeId, courseId, invoiceNo, amount, pending: amount, dueDate
    });

    res.status(201).json({ message: "Invoice created", invoice });
  } catch (err) {
    console.error("createInvoice:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.listInvoices = async (req, res) => {
  try {
    const tenantId = req.user.tenantId;
    const branchId = req.user.branchId;
    const invoices = await Invoice.find({ tenantId, branchId }).populate("studentId").sort({ createdAt: -1 });
    res.json({ invoices });
  } catch (err) {
    console.error("listInvoices:", err);
    res.status(500).json({ message: err.message });
  }
};

// record payment (manual)
exports.recordPayment = async (req, res) => {
  try {
    const { invoiceId, amount, method, note } = req.body;
    const userId = req.user.id;
    if (!invoiceId || !amount) return res.status(400).json({ message: "invoiceId & amount required" });

    const invoice = await Invoice.findOne({ _id: invoiceId, tenantId: req.user.tenantId, branchId: req.user.branchId });
    if (!invoice) return res.status(404).json({ message: "Invoice not found" });

    invoice.payments.push({ amount, method, date: new Date(), receivedBy: userId, note });
    invoice.pending = Math.max(0, invoice.pending - amount);
    invoice.status = invoice.pending === 0 ? "PAID" : (invoice.pending < invoice.amount ? "PARTIAL" : "UNPAID");
    await invoice.save();

    res.json({ message: "Payment recorded", invoice });
  } catch (err) {
    console.error("recordPayment:", err);
    res.status(500).json({ message: err.message });
  }
};
