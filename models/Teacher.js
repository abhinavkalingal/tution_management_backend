const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, lowercase: true, unique: true },
  phone: String,
  branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' },
  subjects: [String],
  availability: [{ day: String, start: String, end: String }],
  fcmToken: String,
  meta: Object
}, { timestamps: true });

module.exports = mongoose.model('Teacher', teacherSchema);
