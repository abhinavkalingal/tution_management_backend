const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

// Only admin/branchadmin can create a teacher
router.post(
  '/',
  authenticate,
  authorize(['admin', 'branchadmin']),
  teacherController.createTeacher
);

// All authenticated users can view teachers
router.get('/', authenticate, teacherController.getAllTeachers);

router.get('/:id', authenticate, teacherController.getTeacherById);

// Only admin/branchadmin can update
router.put(
  '/:id',
  authenticate,
  authorize(['admin', 'branchadmin']),
  teacherController.updateTeacher
);

// Only admin/branchadmin can delete
router.delete(
  '/:id',
  authenticate,
  authorize(['admin', 'branchadmin']),
  teacherController.deleteTeacher
);

module.exports = router;
