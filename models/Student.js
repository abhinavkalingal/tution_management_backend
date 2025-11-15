const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, lowercase: true },
  phone: String,
  address: String,
  rollNo: String,
  branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  attendance: [{
    date: Date,
    status: { type: String, enum: ['present', 'absent', 'leave'], default: 'present' },
    markedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  }],
  assignments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' }],
  meta: { type: Object } // extra fields for customization
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
