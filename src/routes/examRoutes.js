const express = require("express");
const router = express.Router();
const exam = require("../controllers/examController");
const auth = require("../middlewares/auth");
const { allowRoles } = require("../middlewares/role");

router.use(auth, allowRoles("ADMIN", "OWNER", "TEACHER"));

// Exam
router.post("/", exam.createExam);
router.get("/", exam.listExams);

// Marks
router.post("/marks", exam.addMarks);

// Results
router.get("/:id", exam.getExamResults);

module.exports = router;
