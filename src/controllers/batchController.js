const Batch = require("../models/Batch");

// create batch (owner/admin)
exports.createBatch = async (req, res) => {
  try {
    const tenantId = req.user.tenantId;
    const branchId = req.user.branchId;
    const { name, courseId, teacherId, days, startTime, endTime } = req.body;
    if (!name || !courseId) return res.status(400).json({ message: "name & courseId required" });

    const batch = await Batch.create({ tenantId, branchId, name, courseId, teacherId, days, startTime, endTime });
    res.status(201).json({ message: "Batch created", batch });
  } catch (err) {
    console.error("createBatch:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.getBatch = async (req, res) => {
  try {
    const tenantId = req.user.tenantId;
    const batch = await Batch.findOne({ _id: req.params.id, tenantId }).populate("teacherId courseId");
    if (!batch) return res.status(404).json({ message: "Batch not found" });
    res.json({ batch });
  } catch (err) {
    console.error("getBatch:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.updateBatch = async (req, res) => {
  try {
    const tenantId = req.user.tenantId;
    const batch = await Batch.findOneAndUpdate({ _id: req.params.id, tenantId }, { $set: req.body }, { new: true });
    if (!batch) return res.status(404).json({ message: "Batch not found" });
    res.json({ message: "Batch updated", batch });
  } catch (err) {
    console.error("updateBatch:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.deleteBatch = async (req, res) => {
  try {
    const tenantId = req.user.tenantId;
    const batch = await Batch.findOneAndDelete({ _id: req.params.id, tenantId });
    if (!batch) return res.status(404).json({ message: "Batch not found" });
    res.json({ message: "Batch deleted" });
  } catch (err) {
    console.error("deleteBatch:", err);
    res.status(500).json({ message: err.message });
  }
};
