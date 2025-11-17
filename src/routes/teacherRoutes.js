const express = require("express");
const router = express.Router();
const teacher = require("../controllers/teacherController");
const auth = require("../middlewares/auth");
const { allowRoles } = require("../middlewares/role");

router.use(auth, allowRoles("TEACHER"));

// Dashboard
router.get("/dashboard", teacher.getDashboard);

// Mark attendance for batch
router.post("/attendance/batch", teacher.markAttendanceForBatch);

module.exports = router;
