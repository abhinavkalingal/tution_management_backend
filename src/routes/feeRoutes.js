const express = require("express");
const router = express.Router();
const fee = require("../controllers/feeController");
const auth = require("../middlewares/auth");
const { allowRoles } = require("../middlewares/role");

router.use(auth, allowRoles("ADMIN", "OWNER"));

// Fee structure
router.post("/structures", fee.createFeeStructure);
router.get("/structures", fee.listFeeStructures);

// Invoice
router.post("/invoices", fee.createInvoice);
router.get("/invoices", fee.listInvoices);

// Payment
router.post("/payments", fee.recordPayment);

module.exports = router;
