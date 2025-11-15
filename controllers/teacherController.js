const Teacher = require('../models/Teacher');

exports.createTeacher = async (req, res, next) => {
  try {
    const teacher = new Teacher(req.body);
    await teacher.save();
    res.status(201).json(teacher);
  } catch (err) {
    next(err);
  }
};

exports.getAllTeachers = async (req, res, next) => {
  try {
    const { branch } = req.query;
    const filter = branch ? { branch } : {};
    const teachers = await Teacher.find(filter).lean();
    res.json(teachers);
  } catch (err) {
    next(err);
  }
};

exports.getTeacherById = async (req, res, next) => {
  try {
    const teacher = await Teacher.findById(req.params.id).lean();
    if (!teacher) return res.status(404).json({ msg: 'Teacher not found' });
    res.json(teacher);
  } catch (err) {
    next(err);
  }
};

exports.updateTeacher = async (req, res, next) => {
  try {
    const updated = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.deleteTeacher = async (req, res, next) => {
  try {
    await Teacher.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Teacher deleted' });
  } catch (err) {
    next(err);
  }
};
