const mongoose = require("mongoose");

const SubscriptionSchema = new mongoose.Schema(
  {
    tenantId: { type: mongoose.Types.ObjectId, required: true },

    planName: { type: String },
    amount: { type: Number },
    startDate: { type: Date },
    endDate: { type: Date },

    status: {
      type: String,
      enum: ["ACTIVE", "EXPIRED", "CANCELLED"],
      default: "ACTIVE"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subscription", SubscriptionSchema);
