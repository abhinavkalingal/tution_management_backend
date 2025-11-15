// models/Exam.js
const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  title: { type: String, required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  date: { type: Date },
  totalMarks: Number,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  results: [{
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    marks: Number,
    grade: String,
    feedback: String
  }]
}, { timestamps: true });

module.exports = mongoose.model('Exam', examSchema);
