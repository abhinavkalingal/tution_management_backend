const express = require("express");
const router = express.Router();
const admin = require("../controllers/branchAdminController");
const auth = require("../middlewares/auth");
const { allowRoles } = require("../middlewares/role");

router.use(auth, allowRoles("ADMIN", "OWNER"));

// Teachers
router.post("/teachers", admin.createTeacher);
router.get("/teachers", admin.listTeachers);

// Students
router.post("/students", admin.createStudent);
router.get("/students", admin.listStudents);

// Batches
router.post("/batches", admin.createBatch);
router.get("/batches", admin.listBatches);
router.put("/batches/assign-teacher", admin.assignTeacher);

module.exports = router;
