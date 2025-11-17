const Attendance = require("../models/Attendance");
const mongoose = require("mongoose");

// base filter
const baseFilter = (req) => {
  const f = { tenantId: req.user.tenantId };
  if (req.user.role !== "OWNER") f.branchId = req.user.branchId;
  else if (req.query.branchId) f.branchId = req.query.branchId;
  return f;
};

// bulk mark
exports.bulkMark = async (req, res) => {
  try {
    const markerId = req.user.id;
    const tenantId = req.user.tenantId;
    const branchId = req.user.branchId;
    const { date, targetType, entries } = req.body;
    if (!date || !targetType || !Array.isArray(entries)) return res.status(400).json({ message: "date,targetType,entries required" });

    const day = new Date(date); day.setHours(0,0,0,0);
    const ops = entries.map(e => ({
      updateOne: {
        filter: { tenantId, branchId, targetType, targetId: mongoose.Types.ObjectId(e.targetId), date: day },
        update: { $set: { status: e.status || "PRESENT", batchId: e.batchId ? mongoose.Types.ObjectId(e.batchId) : undefined, note: e.note || "", markedBy: markerId, updatedAt: new Date() }, $setOnInsert: { createdAt: new Date() } },
        upsert: true
      }
    }));
    // cleanup undefined keys in update documents occurs automatically when upsert, but we ensure
    const result = await Attendance.bulkWrite(ops, { ordered: false });
    res.json({ message: "Attendance marked", result });
  } catch (err) {
    console.error("bulkMark:", err);
    res.status(500).json({ message: err.message });
  }
};

// single mark
exports.markSingle = async (req, res) => {
  try {
    const markerId = req.user.id;
    const tenantId = req.user.tenantId;
    const branchId = req.user.branchId;
    const { date, targetType, targetId, status = "PRESENT", batchId, note } = req.body;
    if (!date || !targetType || !targetId) return res.status(400).json({ message: "date,targetType,targetId required" });

    const day = new Date(date); day.setHours(0,0,0,0);
    const doc = await Attendance.findOneAndUpdate({ tenantId, branchId, targetType, targetId, date: day }, { $set: { status, batchId, note, markedBy: markerId } }, { upsert: true, new: true, setDefaultsOnInsert: true });
    res.json({ message: "Attendance saved", attendance: doc });
  } catch (err) {
    console.error("markSingle:", err);
    res.status(500).json({ message: err.message });
  }
};

// get by date
exports.getByDate = async (req, res) => {
  try {
    const filter = baseFilter(req);
    const { date, targetType, batchId } = req.query;
    if (!date) return res.status(400).json({ message: "date required" });

    const day = new Date(date); day.setHours(0,0,0,0);
    filter.date = day;
    if (targetType) filter.targetType = targetType;
    if (batchId) filter.batchId = batchId;

    const records = await Attendance.find(filter).sort({ targetType: 1, targetId: 1 });
    res.json({ date: day, count: records.length, records });
  } catch (err) {
    console.error("getByDate:", err);
    res.status(500).json({ message: err.message });
  }
};

// student report
exports.studentReport = async (req, res) => {
  try {
    const tenantId = req.user.tenantId;
    const branchContext = req.user.branchId;
    const studentId = req.params.studentId;
    const { from, to } = req.query;
    if (!studentId) return res.status(400).json({ message: "studentId required" });

    const filter = { tenantId, targetType: "STUDENT", targetId: studentId };
    if (branchContext) filter.branchId = branchContext;

    if (from) {
      const f = new Date(from); f.setHours(0,0,0,0);
      filter.date = { $gte: f };
    }
    if (to) {
      const t = new Date(to); t.setHours(23,59,59,999);
      filter.date = filter.date ? { ...filter.date, $lte: t } : { $lte: t };
    }

    const records = await Attendance.find(filter).sort({ date: 1 });
    const summary = records.reduce((acc, r) => {
      acc.total = (acc.total || 0) + 1;
      acc[r.status] = (acc[r.status] || 0) + 1;
      return acc;
    }, {});
    res.json({ studentId, summary, records });
  } catch (err) {
    console.error("studentReport:", err);
    res.status(500).json({ message: err.message });
  }
};

// monthly summary (owner allowed to pass branchId)
exports.monthlySummary = async (req, res) => {
  try {
    const tenantId = req.user.tenantId;
    const role = req.user.role;
    const branchIdQuery = req.query.branchId;
    const branchId = role === "OWNER" && branchIdQuery ? branchIdQuery : req.user.branchId;
    const year = parseInt(req.query.year, 10) || new Date().getFullYear();
    const month = parseInt(req.query.month, 10) || (new Date().getMonth() + 1);

    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 1);

    const filter = { tenantId, date: { $gte: start, $lt: end } };
    if (branchId) filter.branchId = branchId;

    const agg = await Attendance.aggregate([
      { $match: filter },
      { $group: { _id: { targetType: "$targetType", targetId: "$targetId", status: "$status" }, count: { $sum: 1 } } },
      { $group: { _id: { targetType: "$_id.targetType", targetId: "$_id.targetId" }, statuses: { $push: { status: "$_id.status", count: "$count" } } } },
      { $project: { targetType: "$_id.targetType", targetId: "$_id.targetId", statuses: 1 } }
    ]);

    res.json({ year, month, branchId: branchId || null, data: agg });
  } catch (err) {
    console.error("monthlySummary:", err);
    res.status(500).json({ message: err.message });
  }
};
