// controllers/attendanceController.js
const Attendance = require("../models/Attendance");
const Student = require("../models/Student");

exports.markAttendance = async (req, res, next) => {
  try {
    const { records, courseId, branchId, date } = req.body;

    if (!records || !courseId || !branchId || !date) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const attendanceDocs = records.map(r => ({
      student: r.studentId,
      status: r.status,
      course: courseId,
      branch: branchId,
      date,
      teacher: req.user.id
    }));

    await Attendance.insertMany(attendanceDocs);

    res.json({ message: "Attendance marked successfully" });
  } catch (err) {
    next(err);
  }
};

exports.getStudentAttendance = async (req, res, next) => {
  try {
    const studentId = req.params.id;

    const records = await Attendance.find({ student: studentId })
      .populate("course", "title")
      .populate("teacher", "name")
      .sort({ date: -1 });

    res.json(records);
  } catch (err) {
    next(err);
  }
};

exports.attendanceReport = async (req, res, next) => {
  try {
    const { branchId, courseId } = req.query;

    const match = {};
    if (branchId) match.branch = branchId;
    if (courseId) match.course = courseId;

    const report = await Attendance.aggregate([
      { $match: match },
      {
        $group: {
          _id: "$student",
          total: { $sum: 1 },
          present: { $sum: { $cond: [{ $eq: ["$status", "present"] }, 1, 0] } }
        }
      }
    ]);

    res.json(report);
  } catch (err) {
    next(err);
  }
};
