const sendNotification = require('../utils/sendNotification');
const User = require('../models/User');
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');

exports.sendToDevice = async (req, res, next) => {
  try {
    const { token, title, body, data } = req.body;
    if (!token) return res.status(400).json({ msg: 'Token required' });

    const response = await sendNotification(token, { title, body }, data || {});
    res.json({ success: true, response });
  } catch (err) {
    next(err);
  }
};

exports.broadcastToBranch = async (req, res, next) => {
  try {
    const { branchId, title, body, filter } = req.body;
    // gather tokens from users in branch (students & teachers)
    const students = await Student.find({ branch: branchId }, 'fcmToken').lean();
    const teachers = await Teacher.find({ branch: branchId }, 'fcmToken').lean();

    const tokens = [];
    students.forEach(s => s.fcmToken && tokens.push(s.fcmToken));
    teachers.forEach(t => t.fcmToken && tokens.push(t.fcmToken));

    const results = [];
    for (const token of tokens) {
      try {
        const r = await sendNotification(token, { title, body }, filter || {});
        results.push({ token, result: r });
      } catch (e) {
        results.push({ token, error: e.message });
      }
    }

    res.json({ sent: results.length, details: results });
  } catch (err) {
    next(err);
  }
};
