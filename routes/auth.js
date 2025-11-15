const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");

router.post("/register", register);   // for admin or first time
router.post("/login", login);

module.exports = router;
