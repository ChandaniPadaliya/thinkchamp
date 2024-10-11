const { addStudent, activeStudent, getOneStudent, getAllStudent, editStudent, removeStudent, loginStudent, forgotPassword, setNewPassword, sendOTP, verifyOtp, getAllStudentByCourseId } = require('../controller/student/student.post')
const express = require('express')
const { singleUpload } = require('../middleware/upload')
const router = express.Router()

router.post('/addStudent', singleUpload, addStudent)
router.patch('/activeStudent/:_id', activeStudent)
router.post('/editStudent', singleUpload, editStudent)
router.get('/getOneStudent/:_id', getOneStudent)
router.get('/getAllStudent', getAllStudent)
router.patch('/removeStudent/:_id', removeStudent)
router.post('/loginStudent', singleUpload, loginStudent)
router.post('/forgotPassword', singleUpload, forgotPassword)
router.post('/setNewPassword', singleUpload, setNewPassword)
router.post('/sendOTP', singleUpload, sendOTP)
router.post('/verifyOtp', singleUpload, verifyOtp)
router.post('/getAllStudentByCourseId', singleUpload, getAllStudentByCourseId)

module.exports = router