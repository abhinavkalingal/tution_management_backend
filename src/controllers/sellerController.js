const Tenant = require("../models/Tenant");

// Create tenant (seller only)
exports.createTenant = async (req, res) => {
  try {
    const { name, email, phone, address, domain, plan } = req.body;
    if (!name) return res.status(400).json({ message: "Tenant name required" });

    // basic domain uniqueness check
    if (domain) {
      const d = await Tenant.findOne({ domain });
      if (d) return res.status(400).json({ message: "Domain already in use" });
    }

    const tenant = await Tenant.create({
      name, email, phone, address, domain,
      plan: {
        name: plan?.name || "free",
        price: plan?.price || 0,
        maxBranches: plan?.maxBranches ?? 1,
        maxStudents: plan?.maxStudents ?? 100
      },
      planExpiresAt: plan?.expiresAt ?? null
    });

    res.status(201).json({ message: "Tenant created", tenant });
  } catch (err) {
    console.error("createTenant:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.listTenants = async (req, res) => {
  try {
    const { page = 1, limit = 20, status, q } = req.query;
    const query = {};
    if (status) query.status = status;
    if (q) query.name = { $regex: q, $options: "i" };

    const skip = (Math.max(1, page) - 1) * Number(limit);
    const [tenants, total] = await Promise.all([
      Tenant.find(query).skip(skip).limit(Number(limit)).sort({ createdAt: -1 }),
      Tenant.countDocuments(query)
    ]);
    res.json({ tenants, total, page: Number(page), limit: Number(limit) });
  } catch (err) {
    console.error("listTenants:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.getTenant = async (req, res) => {
  try {
    const { id } = req.params;
    const tenant = await Tenant.findById(id);
    if (!tenant) return res.status(404).json({ message: "Tenant not found" });
    res.json({ tenant });
  } catch (err) {
    console.error("getTenant:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.updateTenant = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    delete updates.status;
    const tenant = await Tenant.findByIdAndUpdate(id, updates, { new: true });
    if (!tenant) return res.status(404).json({ message: "Tenant not found" });
    res.json({ message: "Tenant updated", tenant });
  } catch (err) {
    console.error("updateTenant:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.assignPlan = async (req, res) => {
  try {
    const { id } = req.params;
    const { planName, price, maxBranches, maxStudents, expiresAt } = req.body;
    const tenant = await Tenant.findById(id);
    if (!tenant) return res.status(404).json({ message: "Tenant not found" });

    tenant.plan = {
      name: planName || tenant.plan.name,
      price: typeof price === "number" ? price : tenant.plan.price,
      maxBranches: typeof maxBranches === "number" ? maxBranches : tenant.plan.maxBranches,
      maxStudents: typeof maxStudents === "number" ? maxStudents : tenant.plan.maxStudents
    };
    tenant.planExpiresAt = expiresAt ? new Date(expiresAt) : tenant.planExpiresAt;
    await tenant.save();
    res.json({ message: "Plan assigned", tenant });
  } catch (err) {
    console.error("assignPlan:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.setStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!["ACTIVE", "SUSPENDED", "DELETED"].includes(status)) return res.status(400).json({ message: "Invalid status" });
    const tenant = await Tenant.findByIdAndUpdate(id, { status }, { new: true });
    if (!tenant) return res.status(404).json({ message: "Tenant not found" });
    res.json({ message: "Tenant status updated", tenant });
  } catch (err) {
    console.error("setStatus:", err);
    res.status(500).json({ message: err.message });
  }
};
