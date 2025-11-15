// controllers/reportController.js
const Student = require("../models/Student");
const Course = require("../models/Course");
const Attendance = require("../models/Attendance");
const Exam = require("../models/Exam");

exports.dashboard = async (req, res, next) => {
  try {
    const totalStudents = await Student.countDocuments();
    const totalCourses = await Course.countDocuments();
    const totalExams = await Exam.countDocuments();

    res.json({
      totalStudents,
      totalCourses,
      totalExams
    });
  } catch (err) {
    next(err);
  }
};

exports.studentProgress = async (req, res, next) => {
  try {
    const studentId = req.params.id;

    const attendance = await Attendance.find({ student: studentId });
    const exams = await Exam.find({ "results.student": studentId });

    const examResults = exams.map(exam => {
      const result = exam.results.find(r => r.student.toString() === studentId);
      return {
        exam: exam.title,
        marks: result.marks,
        grade: result.grade
      };
    });

    res.json({
      attendanceCount: attendance.length,
      exams: examResults
    });
  } catch (err) {
    next(err);
  }
};
