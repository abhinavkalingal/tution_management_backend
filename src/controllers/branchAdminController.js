const Teacher = require("../models/Teacher");
const Student = require("../models/Student");
const Batch = require("../models/Batch");

const context = (req) => ({ tenantId: req.user.tenantId, branchId: req.user.branchId });

// TEACHERS
exports.createTeacher = async (req, res) => {
  try {
    const base = context(req);
    const { name, email, phone, salary, subjects } = req.body;
    if (!name) return res.status(400).json({ message: "Name required" });

    const t = await Teacher.create({ ...base, name, email, phone, salary, subjects });
    res.status(201).json({ message: "Teacher created", teacher: t });
  } catch (err) {
    console.error("createTeacher:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.listTeachers = async (req, res) => {
  try {
    const base = context(req);
    const teachers = await Teacher.find(base).sort({ createdAt: -1 });
    res.json({ teachers });
  } catch (err) {
    console.error("listTeachers:", err);
    res.status(500).json({ message: err.message });
  }
};

// STUDENTS
exports.createStudent = async (req, res) => {
  try {
    const base = context(req);
    const { name, admissionNo, phone, parentName, parentPhone, courseId, batchId } = req.body;
    if (!name) return res.status(400).json({ message: "name required" });

    const student = await Student.create({ ...base, name, admissionNo, phone, parentName, parentPhone, courseId, batchId });
    res.status(201).json({ message: "Student created", student });
  } catch (err) {
    console.error("createStudent:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.listStudents = async (req, res) => {
  try {
    const base = context(req);
    const students = await Student.find(base).sort({ createdAt: -1 });
    res.json({ students });
  } catch (err) {
    console.error("listStudents:", err);
    res.status(500).json({ message: err.message });
  }
};

// BATCHES
exports.createBatch = async (req, res) => {
  try {
    const base = context(req);
    const { name, courseId, teacherId, days, startTime, endTime } = req.body;
    if (!name) return res.status(400).json({ message: "name required" });

    const batch = await Batch.create({ ...base, name, courseId, teacherId, days, startTime, endTime });
    res.status(201).json({ message: "Batch created", batch });
  } catch (err) {
    console.error("createBatch:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.listBatches = async (req, res) => {
  try {
    const base = context(req);
    const batches = await Batch.find(base).populate("teacherId").populate("courseId").sort({ createdAt: -1 });
    res.json({ batches });
  } catch (err) {
    console.error("listBatches:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.assignTeacher = async (req, res) => {
  try {
    const { batchId, teacherId } = req.body;
    const base = context(req);
    if (!batchId || !teacherId) return res.status(400).json({ message: "batchId & teacherId required" });

    const batch = await Batch.findOneAndUpdate({ _id: batchId, ...base }, { teacherId }, { new: true });
    if (!batch) return res.status(404).json({ message: "Batch not found" });

    res.json({ message: "Teacher assigned to batch", batch });
  } catch (err) {
    console.error("assignTeacher:", err);
    res.status(500).json({ message: err.message });
  }
};
