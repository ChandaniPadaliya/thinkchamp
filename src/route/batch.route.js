const { addBatch, activeBatch, scheduleInterview, getOneBatch, getAllBatch, editBatch, removeBatch, removeInterview } = require('../controller/batch/batch.controller')
const { singleUpload } = require('../middleware/upload')
const express = require('express')
const router = express.Router()

router.post('/addBatch', addBatch)
router.patch('/activeBatch/:_id', activeBatch)
router.get('/getOneBatch/:_id', getOneBatch)
router.get('/getAllBatch', getAllBatch)
router.post('/editBatch', singleUpload, editBatch)
router.patch('/removeBatch/:_id', removeBatch)
router.post('/scheduleInterview', singleUpload, scheduleInterview)
router.post('/removeInterview', singleUpload, removeInterview)



module.exports = router