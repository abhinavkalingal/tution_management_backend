// routes/reports.js
const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const { authenticate, authorize } = require("../middleware/authMiddleware")


router.get('/dashboard', authenticate, authorize(['admin','branchadmin']), reportController.dashboard);
router.get('/student/:id/progress', authenticate, reportController.studentProgress);

module.exports = router;
