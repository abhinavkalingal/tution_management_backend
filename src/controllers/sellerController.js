const Tenant = require("../models/Tenant");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Seller creates tenant + auto create OWNER
exports.createTenant = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Tenant name & owner email required" });
    }

    // Create Tenant
    const tenant = await Tenant.create({
      name,
      email,
      phone,
      address,
      createdBy: req.user.id
    });

    // Auto-create owner
    const defaultPassword = "owner123"; // You can generate random password
    const hashed = await bcrypt.hash(defaultPassword, 10);

    const owner = await User.create({
      name: `${name} Owner`,
      email: email,
      password: hashed,
      role: "OWNER",
      tenantId: tenant._id,
      isActive: true
    });

    res.status(201).json({
      message: "Tenant created + Owner account generated",
      tenant,
      owner: {
        id: owner._id,
        email: owner.email,
        password: defaultPassword
      }
    });

  } catch (err) {
    console.log("createTenant error:", err);
    res.status(500).json({ message: err.message });
  }
};
