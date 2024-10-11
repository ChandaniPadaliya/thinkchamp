const { enrollmentModel } = require('../model/enrollment.model')
exports.addEnrollment = async (req, res) => {
    try {
        const enrollmentNo = "ThinkChamp/2023/11/0000"
        const studentName = "init"
        const studentId = "init"
        const data = { enrollmentNo, studentName, studentId }
        const saveData = new enrollmentModel(data)
        await saveData.save()
        return res.send({ status: true, subCode: 200, message: "enrollment added successfully ", data: saveData })
    }
    catch (error) {
        console.error("Helper Err:", error);
        return res.send({ status: false, subCode: 400, message: error.message });
    }
}