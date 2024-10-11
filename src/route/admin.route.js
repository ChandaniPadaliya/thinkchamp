const { addAdmin, loginAdmin, activeAdmin, getOneAdmin, getAllAdmin, editAdmin, removeAdmin, sendOTP, verifyOtp } = require('../controller/admin/admin.controller')
const express = require('express')
const router = express.Router()
const { singleUpload } = require('../middleware/upload')

router.post('/addAdmin' , addAdmin)
router.patch('/activeAdmin/:_id', activeAdmin)
router.get('/getOneAdmin/:_id', getOneAdmin)
router.get('/getAllAdmin', getAllAdmin)
router.post('/editAdmin', singleUpload, editAdmin)
router.patch('/removeAdmin/:_id', removeAdmin)
router.post('/loginAdmin', singleUpload, loginAdmin)
router.post('/sendOTP', singleUpload, sendOTP)
router.post('/verifyOtp', singleUpload, verifyOtp)


module.exports = router