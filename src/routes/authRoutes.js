const express = require("express");
const router = express.Router();
const auth = require("../controllers/authController");

// Public
router.post("/login", auth.login);

// Seller initial creation (manual)
router.post("/register-seller", auth.registerSeller);

module.exports = router;
