const express = require("express");
const router = express.Router();
const seller = require("../controllers/sellerController");
const auth = require("../middlewares/auth");
const { allowRoles } = require("../middlewares/role");

router.use(auth, allowRoles("SELLER"));

// Tenants
router.post("/tenants", seller.createTenant);
router.get("/tenants", seller.listTenants);
router.get("/tenants/:id", seller.getTenant);
router.put("/tenants/:id", seller.updateTenant);

// Plan assignment
router.put("/tenants/:id/plan", seller.assignPlan);

// Status change
router.patch("/tenants/:id/status", seller.setStatus);

module.exports = router;
