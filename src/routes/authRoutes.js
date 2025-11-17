// src/routes/authRoutes.js
const express = require("express");
const router = express.Router();
const auth = require("../controllers/authController");

// public
router.post("/login", auth.login);
router.post("/register-seller", auth.registerSeller);

module.exports = router;
