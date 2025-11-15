// models/Fee.js
const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch",
    required: true,
  },

  totalFee: {
    type: Number,
    required: true,
  },

  paid: {
    type: Number,
    default: 0,
  },

  due: {
    type: Number,
    default: 0,
  },

  payments: [
    {
      amount: Number,
      date: {
        type: Date,
        default: Date.now,
      },
      mode: {
        type: String,
        enum: ["cash", "upi", "bank", "cheque"],
      },
      note: String,
      receivedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],

}, { timestamps: true });

module.exports = mongoose.model("Fee", feeSchema);
