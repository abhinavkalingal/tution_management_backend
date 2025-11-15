// routes/exams.js
const express = require('express');
const router = express.Router();
const examController = require('../controllers/examController');
const { authenticate, authorize } = require("../middleware/authMiddleware")


router.post('/', authenticate, authorize(['teacher','admin']), examController.createExam);
router.get('/', authenticate, examController.getExams);
router.get('/:id', authenticate, examController.getExamById);
router.post('/:id/result', authenticate, authorize(['teacher','admin']), examController.addResult);

module.exports = router;
