const Assignment = require('../models/Assignment');

exports.createAssignment = async (req, res, next) => {
  try {
    const payload = { ...req.body, createdBy: req.user.userId };
    const assignment = new Assignment(payload);
    await assignment.save();
    res.status(201).json(assignment);
  } catch (err) {
    next(err);
  }
};

exports.getAssignments = async (req, res, next) => {
  try {
    const { course } = req.query;
    const filter = course ? { course } : {};
    const assignments = await Assignment.find(filter).populate('course', 'title').lean();
    res.json(assignments);
  } catch (err) {
    next(err);
  }
};

exports.getAssignmentById = async (req, res, next) => {
  try {
    const assignment = await Assignment.findById(req.params.id).lean();
    if (!assignment) return res.status(404).json({ msg: 'Assignment not found' });
    res.json(assignment);
  } catch (err) {
    next(err);
  }
};

exports.updateAssignment = async (req, res, next) => {
  try {
    const updated = await Assignment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.deleteAssignment = async (req, res, next) => {
  try {
    await Assignment.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Assignment deleted' });
  } catch (err) {
    next(err);
  }
};

exports.submitAssignment = async (req, res, next) => {
  try {
    const { id } = req.params; // assignment id
    const { studentId, files } = req.body;

    const assignment = await Assignment.findById(id);
    if (!assignment) return res.status(404).json({ msg: 'Assignment not found' });

    assignment.submissions.push({
      student: studentId || req.user.userId,
      submittedAt: new Date(),
      files: files || []
    });

    await assignment.save();
    res.json({ msg: 'Submitted successfully', assignment });
  } catch (err) {
    next(err);
  }
};
