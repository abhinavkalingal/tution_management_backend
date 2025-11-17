const Tenant = require("../models/Tenant");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Create tenant + owner
const createTenant = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;

    // 1) Create Tenant
    const tenant = await Tenant.create({
      name,
      email,
      phone,
      address,
      status: "ACTIVE"
    });

    // 2) Generate owner credentials
    const ownerEmail = req.body.ownerEmail; 
    const ownerPassword = req.body.ownerPassword || "owner123"; // default password
    const hashedPassword = await bcrypt.hash(ownerPassword, 10);

    // 3) Create OWNER user
    const owner = await User.create({
      name: `${name} Owner`,
      email: ownerEmail,
      password: hashedPassword,
      role: "OWNER",
      tenantId: tenant._id,
      isActive: true
    });

    res.json({
      message: "Tenant + Owner created successfully",
      tenant,
      owner: {
        id: owner._id,
        email: owner.email,
        defaultPassword: ownerPassword
      }
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
