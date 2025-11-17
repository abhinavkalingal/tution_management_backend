const Course = require("../models/Course");

const baseContext = (req) => ({ tenantId: req.user.tenantId, branchId: req.user.branchId });

exports.createCourse = async (req, res) => {
  try {
    const { name, description, duration, subjects } = req.body;
    if (!name) return res.status(400).json({ message: "Course name required" });

    const course = await Course.create({ ...baseContext(req), name, description, duration, subjects });
    res.status(201).json({ message: "Course created", course });
  } catch (err) {
    console.error("createCourse:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.listCourses = async (req, res) => {
  try {
    const tenantId = req.user.tenantId;
    let branchId = req.user.branchId;
    if (req.user.role === "OWNER" && req.query.branchId) branchId = req.query.branchId;

    const filter = { tenantId };
    if (branchId) filter.branchId = branchId;

    const courses = await Course.find(filter).sort({ createdAt: -1 });
    res.json({ courses });
  } catch (err) {
    console.error("listCourses:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findOne({ _id: req.params.id, tenantId: req.user.tenantId });
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json({ course });
  } catch (err) {
    console.error("getCourse:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findOneAndUpdate({ _id: req.params.id, tenantId: req.user.tenantId }, { $set: req.body }, { new: true });
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json({ message: "Course updated", course });
  } catch (err) {
    console.error("updateCourse:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.setCourseStatus = async (req, res) => {
  try {
    const { isActive } = req.body;
    if (typeof isActive !== "boolean") return res.status(400).json({ message: "isActive boolean required" });

    const course = await Course.findOneAndUpdate({ _id: req.params.id, tenantId: req.user.tenantId }, { isActive }, { new: true });
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json({ message: "Course status updated", course });
  } catch (err) {
    console.error("setCourseStatus:", err);
    res.status(500).json({ message: err.message });
  }
};
