const { addUser, loginUser, paginationUser, activeUser, editUser, getOneUser, getAllUser, removeUser } = require('../controller/user/user.post')
const { singleUpload } = require('../middleware/upload')
const express = require('express')
const router = express.Router()

router.post('/addUser', singleUpload, addUser)
router.post('/loginUser', singleUpload, loginUser)
router.get('/paginationUser', paginationUser)
router.patch('/activeUser/:_id', activeUser)
router.post('/editUser', singleUpload, editUser)
router.get('/getOneUser/:_id', getOneUser)
router.get('/getAllUser', getAllUser)
router.patch('/removeUser/:_id', removeUser)

module.exports = router