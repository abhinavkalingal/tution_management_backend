const express = require("express");
const router = express.Router();
const batch = require("../controllers/batchController");
const auth = require("../middlewares/auth");
const { allowRoles } = require("../middlewares/role");

router.use(auth, allowRoles("ADMIN", "OWNER"));

// CRUD
router.post("/", batch.createBatch);
router.get("/:id", batch.getBatch);
router.put("/:id", batch.updateBatch);
router.delete("/:id", batch.deleteBatch);

module.exports = router;
