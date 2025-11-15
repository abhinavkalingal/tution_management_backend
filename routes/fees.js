const express = require("express");
const router = express.Router();
const feeController = require("../controllers/feeController");
const { authenticate, authorize } = require("../middleware/authMiddleware");

// Assign fee to a student
router.post(
  "/assign",
  authenticate,
  authorize(["admin", "branchadmin"]),
  feeController.assignFee
);

// Make payment
router.post(
  "/:feeId/pay",
  authenticate,
  authorize(["admin", "branchadmin"]),
  feeController.makePayment
);

// Get student fees
router.get(
  "/student/:studentId",
  authenticate,
  authorize(["admin", "branchadmin", "student"]),
  feeController.getStudentFees
);

// Fees report
router.get(
  "/report",
  authenticate,
  authorize(["admin", "branchadmin"]),
  feeController.getFeesReport
);

module.exports = router;
