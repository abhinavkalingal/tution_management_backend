// controllers/examController.js
const Exam = require("../models/Exam");

exports.createExam = async (req, res, next) => {
  try {
    const exam = new Exam({
      ...req.body,
      createdBy: req.user.id
    });

    await exam.save();
    res.status(201).json(exam);
  } catch (err) {
    next(err);
  }
};

exports.getExams = async (req, res, next) => {
  try {
    const exams = await Exam.find().populate("course", "title");
    res.json(exams);
  } catch (err) {
    next(err);
  }
};

exports.getExamById = async (req, res, next) => {
  try {
    const exam = await Exam.findById(req.params.id)
      .populate("course", "title")
      .populate("results.student", "name");

    if (!exam) return res.status(404).json({ message: "Not found" });

    res.json(exam);
  } catch (err) {
    next(err);
  }
};

exports.addResult = async (req, res, next) => {
  try {
    const exam = await Exam.findById(req.params.id);

    if (!exam) return res.status(404).json({ message: "Exam not found" });

    exam.results.push({
      student: req.body.student,
      marks: req.body.marks,
      grade: req.body.grade,
      feedback: req.body.feedback
    });

    await exam.save();

    res.json({ message: "Result added", exam });
  } catch (err) {
    next(err);
  }
};
