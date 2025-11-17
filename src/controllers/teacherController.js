const Attendance = require("../models/Attendance");
const Batch = require("../models/Batch");
const Teacher = require("../models/Teacher");

// Get teacher dashboard: today batches (based on branch + teacherId)
exports.getDashboard = async (req, res) => {
  try {
    const tenantId = req.user.tenantId;
    const branchId = req.user.branchId;
    const teacherId = req.user.id;

    // find batches where teacherId equals user id and branch
    const batches = await Batch.find({ tenantId, branchId, teacherId }).sort({ startTime: 1 });
    res.json({ batches });
  } catch (err) {
    console.error("teacher dashboard:", err);
    res.status(500).json({ message: err.message });
  }
};

// Teacher marks attendance for a batch (single or bulk)
exports.markAttendanceForBatch = async (req, res) => {
  try {
    const markerId = req.user.id;
    const tenantId = req.user.tenantId;
    const branchId = req.user.branchId;

    const { date, entries } = req.body; // entries: [{ studentId, status }]
    if (!date || !Array.isArray(entries)) return res.status(400).json({ message: "date & entries required" });

    const day = new Date(date); day.setHours(0,0,0,0);

    const ops = entries.map(e => ({
      updateOne: {
        filter: { tenantId, branchId, targetType: "STUDENT", targetId: e.studentId, date: day },
        update: { $set: { status: e.status || "PRESENT", markedBy: markerId, updatedAt: new Date() }, $setOnInsert: { createdAt: new Date() } },
        upsert: true
      }
    }));

    const result = await Attendance.bulkWrite(ops, { ordered: false });
    res.json({ message: "Attendance marked", result });
  } catch (err) {
    console.error("teacher markAttendance:", err);
    res.status(500).json({ message: err.message });
  }
};
