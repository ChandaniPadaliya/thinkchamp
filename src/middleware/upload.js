const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        try {
            // D: \xampp\htdocs\ThinkChamp\Backend\src\uploads
            cb(null, "D:/xampp/htdocs/ThinkChamp/Backend/src/uploads")
        } catch (error) {
            cb(error, false)
        }
    },
    filename: function (req, file, cb) {
        const date = new Date();
        let d = date.getDate().toString();
        let m = date.getMonth() + 1;
        let y = date.getFullYear().toString();
        var currentDate = y + m + d;
        cb(null, file.fieldname + '_' + currentDate + '_' + Date.now() + '_' + path.extname(file.originalname));
    }
})
const upload = multer({
    storage: storage,
});

var singleUpload = upload.fields([{ name: 'file' }])
const multipleUpload = upload.fields([
    { name: 'Sec1_Background' },
    { name: 'sec1_Image' },
    { name: 'sec3_Image' },
    { name: 'sec3_content1_image' },
    { name: 'sec3_content2_image' },
    { name: 'sec3_content3_image' },
    { name: 'sec3_content4_image' },
    { name: 'sec5_Content1_image' },
    { name: 'sec5_Content2_image' },
    { name: 'sec5_Content3_image' },
    { name: 'sec5_Content4_image' },
    { name: 'sec6_content1_image' },
    { name: 'sec6_content2_image' },
    { name: 'sec6_content3_image' },
    { name: 'sec6_content4_image' },
    { name: 'sec7_logo' }, 
    { name: 'sec7_image' },
    { name: 'sec8_image' }
])
module.exports = { singleUpload, multipleUpload };
