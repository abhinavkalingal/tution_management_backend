const Exam = require("../models/Exam");
const ExamResult = require("../models/ExamResult"); // assume you create this model OR store inside Exam

// create exam
exports.createExam = async (req, res) => {
  try {
    const { batchId, subject, date, totalMarks } = req.body;
    const tenantId = req.user.tenantId;
    const branchId = req.user.branchId;

    if (!batchId || !subject || !date) return res.status(400).json({ message: "batchId,subject,date required" });

    const exam = await Exam.create({ tenantId, branchId, batchId, subject, date, totalMarks });
    res.status(201).json({ message: "Exam created", exam });
  } catch (err) {
    console.error("createExam:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.listExams = async (req, res) => {
  try {
    const tenantId = req.user.tenantId;
    const branchId = req.user.branchId;
    const exams = await Exam.find({ tenantId, branchId }).sort({ date: -1 });
    res.json({ exams });
  } catch (err) {
    console.error("listExams:", err);
    res.status(500).json({ message: err.message });
  }
};

// add / update marks per student (simple)
exports.addMarks = async (req, res) => {
  try {
    const { examId, studentId, marksObtained } = req.body;
    if (!examId || !studentId) return res.status(400).json({ message: "examId & studentId required" });

    let exam = await Exam.findOne({ _id: examId, tenantId: req.user.tenantId });
    if (!exam) return res.status(404).json({ message: "Exam not found" });

    exam.marks = exam.marks || [];
    const idx = exam.marks.findIndex(m => m.studentId.toString() === studentId);
    if (idx >= 0) {
      exam.marks[idx].marksObtained = marksObtained;
    } else {
      exam.marks.push({ studentId, marksObtained });
    }
    await exam.save();
    res.json({ message: "Marks saved", exam });
  } catch (err) {
    console.error("addMarks:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.getExamResults = async (req, res) => {
  try {
    const exam = await Exam.findOne({ _id: req.params.id, tenantId: req.user.tenantId });
    if (!exam) return res.status(404).json({ message: "Exam not found" });
    res.json({ exam });
  } catch (err) {
    console.error("getExamResults:", err);
    res.status(500).json({ message: err.message });
  }
};
