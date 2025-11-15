const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  code: String,
  description: String,
  branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
  fee: { type: Number, default: 0 },
  schedule: [{
    day: String,
    startTime: String,
    endTime: String,
    room: String,
    isOnline: { type: Boolean, default: false },
    meetingLink: String
  }],
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }]
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
