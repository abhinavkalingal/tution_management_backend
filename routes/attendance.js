// routes/attendance.js
const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const { authenticate, authorize } = require("../middleware/authMiddleware")


router.post('/mark', authenticate, authorize(['teacher','admin','branchadmin']), attendanceController.markAttendance);
router.get('/student/:studentId', authenticate, attendanceController.getStudentAttendance);
router.get('/report', authenticate, authorize(['admin','branchadmin']), attendanceController.attendanceReport);

module.exports = router;
