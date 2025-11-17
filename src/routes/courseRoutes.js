const express = require("express");
const router = express.Router();
const course = require("../controllers/courseController");
const auth = require("../middlewares/auth");
const { allowRoles } = require("../middlewares/role");

router.use(auth, allowRoles("ADMIN", "OWNER"));

router.post("/", course.createCourse);
router.get("/", course.listCourses);
router.get("/:id", course.getCourse);
router.put("/:id", course.updateCourse);
router.patch("/:id/status", course.setCourseStatus);

module.exports = router;
