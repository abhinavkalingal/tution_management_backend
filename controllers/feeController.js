// controllers/feeController.js
const Fee = require("../models/Fee");

exports.assignFee = async (req, res, next) => {
  try {
    const { student, course, branch, totalFee } = req.body;

    const fee = new Fee({
      student,
      course,
      branch,
      totalFee,
      due: totalFee,
    });

    await fee.save();

    res.json({ message: "Fee assigned successfully", fee });
  } catch (err) {
    next(err);
  }
};

exports.makePayment = async (req, res, next) => {
  try {
    const { feeId } = req.params;

    const { amount, mode, note } = req.body;

    const fee = await Fee.findById(feeId);
    if (!fee) return res.status(404).json({ message: "Fee record not found" });

    // update payment
    fee.paid += amount;
    fee.due = fee.totalFee - fee.paid;

    fee.payments.push({
      amount,
      mode,
      note,
      receivedBy: req.user.id,
    });

    await fee.save();

    res.json({ message: "Payment recorded", fee });
  } catch (err) {
    next(err);
  }
};

exports.getStudentFees = async (req, res, next) => {
  try {
    const fee = await Fee.findOne({ student: req.params.studentId })
      .populate("course", "title")
      .populate("student", "name")
      .populate("branch", "name");

    if (!fee) return res.status(404).json({ message: "No fee record found" });

    res.json(fee);
  } catch (err) {
    next(err);
  }
};

exports.getFeesReport = async (req, res, next) => {
  try {
    const { branch } = req.query;

    const match = {};
    if (branch) match.branch = branch;

    const fees = await Fee.find(match)
      .populate("student", "name")
      .populate("course", "title");

    const totalCollected = fees.reduce((s, f) => s + f.paid, 0);
    const totalDue = fees.reduce((s, f) => s + f.due, 0);

    res.json({
      totalCollected,
      totalDue,
      fees,
    });
  } catch (err) {
    next(err);
  }
};
