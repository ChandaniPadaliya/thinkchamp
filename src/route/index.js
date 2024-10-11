const express = require("express");
const router = express.Router();

const roleRoute = require('./role.route')
const userRoute = require('./user.route')
const homePageRoute = require('./homePage.route')
const courseRoute = require('./course.route')
const instructorRoute = require('./instructor.route')
const studentRoute = require('./student.route')
const adminRoute = require('./admin.route')
const batchRoute = require('./batch.route')
const syllabusRoute = require('./syllabus.route')
const quizRoute = require('./quiz.route')
const syllabusCategoryRoute = require('./syllabusCategory.route')
const purchaseRoute = require('./purchase.route');
const certificateRoute = require('./certificate.route');
const attendanceRoute = require('./attendance.route')
const leaveRoute = require('./leave.route')
const file = require("./file.routes");

router.use('/roles',roleRoute)
router.use('/users', userRoute)
router.use("/file", file);

// router.use('/homePage', homePageRoute)
// router.use('/course', courseRoute)
// router.use('/instructor', instructorRoute)
router.use('/student', studentRoute)
router.use('/admin', adminRoute)
// router.use('/batch', batchRoute)
// router.use('/syllabus', syllabusRoute)
// router.use('/quiz', quizRoute)
// router.use('/syllabusCategory', syllabusCategoryRoute)
// router.use('/purchase', purchaseRoute);
// router.use('/certificate', certificateRoute);
// router.use('/attendance', attendanceRoute);
// router.use('/leave', leaveRoute)

module.exports = router;

