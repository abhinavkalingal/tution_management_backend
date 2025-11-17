const Notification = require("../models/Notification");
const { sendPush } = require("../utils/fcm");
const User = require("../models/User");

// create and send notification
exports.createNotification = async (req, res) => {
  try {
    const { title, message, sentTo, receivers } = req.body;
    const tenantId = req.user.tenantId;
    let branchId = null;
    if (req.user.role !== "OWNER") branchId = req.user.branchId;
    if (req.body.branchId && req.user.role === "OWNER") branchId = req.body.branchId;

    // create DB record
    const note = await Notification.create({
      tenantId,
      branchId,
      title,
      message,
      sentTo: sentTo || "ALL",
      receivers: receivers || [],
      createdBy: req.user.id
    });

    // optionally send push notifications to users' tokens
    // If receivers not provided, resolve tokens by role within tenant/branch
    let tokens = req.body.fcmTokens || [];
    if ((!tokens || tokens.length === 0) && note.sentTo !== "ALL") {
      // fetch users of particular type
      const users = await User.find({ tenantId, branchId, role: note.sentTo });
      // assume each user has fcmToken field
      tokens = users.map(u => u.fcmToken).filter(Boolean);
    }

    // fire pushes (non-blocking for many tokens)
    if (Array.isArray(tokens) && tokens.length) {
      tokens.forEach(tok => sendPush(tok, title, message));
    }

    res.status(201).json({ message: "Notification created/sent", note });
  } catch (err) {
    console.error("createNotification:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.listNotifications = async (req, res) => {
  try {
    const tenantId = req.user.tenantId;
    const branchId = req.user.role === "OWNER" && req.query.branchId ? req.query.branchId : req.user.branchId;
    const notes = await Notification.find({ tenantId, ...(branchId ? { branchId } : {}) }).sort({ createdAt: -1 });
    res.json({ notes });
  } catch (err) {
    console.error("listNotifications:", err);
    res.status(500).json({ message: err.message });
  }
};
