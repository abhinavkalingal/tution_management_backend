const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

// Only admin or branchadmin can create course
router.post(
  '/',
  authenticate,
  authorize(['admin', 'branchadmin']),
  courseController.createCourse
);

// Anyone logged in can see courses
router.get('/', authenticate, courseController.getAllCourses);

router.get('/:id', authenticate, courseController.getCourseById);

// Only admin or branchadmin can update
router.put(
  '/:id',
  authenticate,
  authorize(['admin', 'branchadmin']),
  courseController.updateCourse
);

// Only admin or branchadmin can delete
router.delete(
  '/:id',
  authenticate,
  authorize(['admin', 'branchadmin']),
  courseController.deleteCourse
);

module.exports = router;
