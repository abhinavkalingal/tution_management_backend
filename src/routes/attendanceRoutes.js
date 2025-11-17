const express = require("express");
const router = express.Router();
const attendance = require("../controllers/attendanceController");
const auth = require("../middlewares/auth");
const { allowRoles } = require("../middlewares/role");

router.use(auth, allowRoles("ADMIN", "OWNER", "TEACHER"));

// Bulk mark
router.post("/bulk", attendance.bulkMark);

// Single
router.post("/single", attendance.markSingle);

// Get by date
router.get("/", attendance.getByDate);

// Student report
router.get("/student/:studentId", attendance.studentReport);

// Monthly summary
router.get("/summary/monthly", attendance.monthlySummary);

module.exports = router;
