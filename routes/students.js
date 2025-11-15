const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

// Only admin or branchadmin can create students
router.post('/', authenticate, authorize(['admin', 'branchadmin']), studentController.createStudent);

// All authenticated users can view
router.get('/', authenticate, studentController.getAllStudents);

router.get('/:id', authenticate, studentController.getStudentById);

router.put('/:id', authenticate, authorize(['admin', 'branchadmin']), studentController.updateStudent);

router.delete('/:id', authenticate, authorize(['admin', 'branchadmin']), studentController.deleteStudent);

module.exports = router;
