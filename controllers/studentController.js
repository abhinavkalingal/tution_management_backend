const Student = require('../models/Student');

exports.createStudent = async (req, res, next) => {
  try {
    const payload = req.body;
    const student = new Student(payload);
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    next(err);
  }
};

exports.getAllStudents = async (req, res, next) => {
  try {
    const { branch } = req.query;
    const filter = branch ? { branch } : {};
    const students = await Student.find(filter).populate('courses', 'title').lean();
    res.json(students);
  } catch (err) {
    next(err);
  }
};

exports.getStudentById = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id).populate('courses').lean();
    if (!student) return res.status(404).json({ msg: 'Student not found' });
    res.json(student);
  } catch (err) {
    next(err);
  }
};

exports.updateStudent = async (req, res, next) => {
  try {
    const updated = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.deleteStudent = async (req, res, next) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Student deleted' });
  } catch (err) {
    next(err);
  }
};
