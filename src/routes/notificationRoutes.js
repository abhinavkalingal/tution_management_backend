const express = require("express");
const router = express.Router();
const note = require("../controllers/notificationController");
const auth = require("../middlewares/auth");
const { allowRoles } = require("../middlewares/role");

router.use(auth, allowRoles("ADMIN", "OWNER"));

// Create + send notification
router.post("/", note.createNotification);

// List
router.get("/", note.listNotifications);

module.exports = router;
