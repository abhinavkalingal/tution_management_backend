const Attendance = require("../models/Attendance");
const Student = require("../models/Student");
const Invoice = require("../models/Invoice");

// Student profile
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    // student accounts may not map 1:1 to Student document; if your Student is separate, fetch by query param
    const { studentId } = req.query;
    if (!studentId) return res.status(400).json({ message: "studentId required" });

    const student = await Student.findOne({ _id: studentId, tenantId: req.user.tenantId });
    if (!student) return res.status(404).json({ message: "Student not found" });

    res.json({ student });
  } catch (err) {
    console.error("getProfile:", err);
    res.status(500).json({ message: err.message });
  }
};

// View attendance for logged student (or studentId admin provided)
exports.getAttendance = async (req, res) => {
  try {
    const tenantId = req.user.tenantId;
    const branchId = req.user.branchId;
    const studentId = req.params.studentId || req.query.studentId;
    if (!studentId) return res.status(400).json({ message: "studentId required" });

    const filter = { tenantId, targetType: "STUDENT", targetId: studentId };
    if (req.user.role !== "OWNER") filter.branchId = branchId;

    const records = await Attendance.find(filter).sort({ date: -1 });
    res.json({ records });
  } catch (err) {
    console.error("getAttendance:", err);
    res.status(500).json({ message: err.message });
  }
};

// View invoices for student
exports.getInvoices = async (req, res) => {
  try {
    const tenantId = req.user.tenantId;
    const branchId = req.user.branchId;
    const studentId = req.params.studentId || req.query.studentId;
    if (!studentId) return res.status(400).json({ message: "studentId required" });

    const query = { tenantId, studentId };
    if (req.user.role !== "OWNER") query.branchId = branchId;

    const invoices = await Invoice.find(query).sort({ createdAt: -1 });
    res.json({ invoices });
  } catch (err) {
    console.error("getInvoices:", err);
    res.status(500).json({ message: err.message });
  }
};
