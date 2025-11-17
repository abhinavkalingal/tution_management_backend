const express = require("express");
const router = express.Router();
const owner = require("../controllers/ownerController");
const auth = require("../middlewares/auth");
const { allowRoles } = require("../middlewares/role");

router.use(auth, allowRoles("OWNER"));

// Branches
router.post("/branches", owner.createBranch);
router.get("/branches", owner.listBranches);
router.get("/branches/:id", owner.getBranch);
router.put("/branches/:id", owner.updateBranch);
router.patch("/branches/:id/status", owner.setBranchStatus);

// Branch Admin
router.post("/admins", owner.createBranchAdmin);
router.get("/admins", owner.listAdmins);

module.exports = router;
