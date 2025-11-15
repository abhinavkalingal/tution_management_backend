const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  attachments: [{ filename: String, url: String }],
  dueDate: Date,
  submissions: [{
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    submittedAt: Date,
    files: [{ filename: String, url: String }],
    marks: Number,
    feedback: String
  }]
}, { timestamps: true });

module.exports = mongoose.model('Assignment', assignmentSchema);
