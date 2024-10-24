const { addCourse, activeCourse, getOneCourse, getAllCourse, editCourse, removeCourse } = require('../controller/course/course.controller')
const { singleUpload } = require('../middleware/upload')
const express = require('express')
const router = express.Router()

router.post('/addCourse', singleUpload, addCourse)
router.patch('/activeCourse/:_id', activeCourse)
router.get('/getOneCourse/:_id', getOneCourse)
router.get('/getAllCourse', getAllCourse)
router.post('/editCourse', singleUpload, editCourse)
router.patch('/removeCourse/:_id', removeCourse)


module.exports = router