const express = require("express");
const router = express.Router();
const student = require("../controllers/studentController");
const auth = require("../middlewares/auth");
const { allowRoles } = require("../middlewares/role");

router.use(auth, allowRoles("STUDENT", "ADMIN", "OWNER"));

// Profile
router.get("/profile", student.getProfile);

// Attendance
router.get("/attendance/:studentId", student.getAttendance);

// Invoices
router.get("/invoices/:studentId", student.getInvoices);

module.exports = router;
