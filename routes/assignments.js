const express = require('express');
const router = express.Router();
const assignmentController = require('../controllers/assignmentController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

// Teacher or admin can create assignment
router.post(
  '/',
  authenticate,
  authorize(['admin', 'teacher', 'branchadmin']),
  assignmentController.createAssignment
);

// Anyone authenticated can view
router.get('/', authenticate, assignmentController.getAssignments);

router.get('/:id', authenticate, assignmentController.getAssignmentById);

// Teacher or admin can update
router.put(
  '/:id',
  authenticate,
  authorize(['admin', 'teacher', 'branchadmin']),
  assignmentController.updateAssignment
);

// Teacher or admin can delete
router.delete(
  '/:id',
  authenticate,
  authorize(['admin', 'teacher', 'branchadmin']),
  assignmentController.deleteAssignment
);

// Student can submit assignment
router.post(
  '/:id/submit',
  authenticate,
  authorize(['student']),
  assignmentController.submitAssignment
);

module.exports = router;
