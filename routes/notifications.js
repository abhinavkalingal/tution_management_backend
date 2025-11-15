const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

// Send a notification to a single device
router.post(
  '/send',
  authenticate,
  authorize(['admin', 'teacher', 'branchadmin']),
  notificationController.sendToDevice
);

// Send a broadcast to an entire branch
router.post(
  '/broadcast',
  authenticate,
  authorize(['admin', 'branchadmin']),
  notificationController.broadcastToBranch
);

module.exports = router;
