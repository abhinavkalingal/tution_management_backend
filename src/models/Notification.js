const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
  {
    tenantId: { type: mongoose.Types.ObjectId, required: true },
    branchId: { type: mongoose.Types.ObjectId },

    title: { type: String, required: true },
    message: { type: String, required: true },

    sentTo: { type: String, enum: ["STUDENT", "TEACHER", "ALL"], default: "ALL" },

    receivers: { type: [mongoose.Types.ObjectId] },
    fcmTokens: { type: [String], default: [] },

    createdBy: { type: mongoose.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", NotificationSchema);
