const { batchModel } = require('../../model/batch.model.jS')
const { adminModel } = require('../../model/admin.model')
const { studentModel } = require('../../model/student.model')
const { parseJwt } = require('../../middleware/auth')

exports.addBatch = async (req, res) => {
    try {
        const token = req.headers.authorization;
        // console.log(token);
        const valid = await adminModel.findOne({ token: token, isDelete: false })
        // console.log(valid);
        if (valid) {
            if (req.body.startDate === "") {
                return res.send({ status: false, subCode: 400, message: "Start Date is required" })
            }
            if (req.body.batchName === "") {
                return res.send({ status: false, subCode: 400, message: "Batch name is required" })
            }
            if (req.body.duration === "") {
                return res.send({ status: false, subCode: 400, message: "Duration is required" })
            }
            if (req.body.endDate === "") {
                return res.send({ status: false, subCode: 400, message: "End Date is required" })
            }
            if (req.body.batchTime === "") {
                return res.send({ status: false, subCode: 400, message: "Batch Time is required" })
            }
            if (req.body.instructorName === "") {
                return res.send({ status: false, subCode: 400, message: "instructorName is required" })
            }
            if (req.body.courseName === "") {
                return res.send({ status: false, subCode: 400, message: "Course name is required" })
            }

            // const studentArray = JSON.parse(req.body.student);
            // if (Array.isArray(studentArray) && studentArray.length === 0) {
            //     return res.send({ status: false, subCode: 400, message: "student is required" })
            // }
            const currentDate = new Date();
            const day = currentDate.getDate().toString().padStart(2, '0');
            const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
            const year = currentDate.getFullYear();
            const formattedDate = `${day}/${month}/${year}`;
            const batch = await batchModel.findOne({
                batchTime: req.body.batchTime, instructorId: req.body.instructorId, startDate: { $lte: formattedDate }, endDate: { $gte: formattedDate }, isDelete: false, isActive: true
            })
            if (!batch) {
                const courseName = req.body.courseName
                const duration = req.body.duration
                const endDate = req.body.endDate
                const startDate = req.body.startDate
                const instructorName = req.body.instructorName
                const instructorId = req.body.instructorId
                const courseId = req.body.courseId
                const student = req.body.student
                // const batchStatus = req.body.batchStatus
                const batchTime = req.body.batchTime
                const batchName = req.body.batchName
                const data = { courseName, batchName, duration, endDate, startDate, batchTime, student, instructorName, instructorId, courseId }
                const saveData = new batchModel(data)
                await saveData.save()
                return res.send({ status: true, subCode: 200, message: "Batch added successfully ", data: saveData })
            }
            else {
                if (batch.batchName === req.body.batchName) {
                    return res.send({ status: false, subCode: 400, message: "Batch name already exist" })
                }
                return res.send({ status: false, subCode: 400, message: `You cannot allot new batch to ${req.body.instructorName} at ${req.body.batchTime} time.` })
            }
        }
        return res.send({ status: false, subCode: 400, message: "Invalid user" })
    } catch (error) {
        console.log("Helper error: " + error)
        return res.send({ status: false, subCode: 400, message: error.message })
    }
}

exports.activeBatch = async (req, res) => {
    try {
        const token = parseJwt(req.headers.authorization);
        // console.log(token);
        const valid = await adminModel.findOne({ token: token, isDelete: false })
        // console.log(valid);
        if (valid) {
            const id = req.params._id
            const data = await batchModel.findOne({ _id: id, isDelete: false });
            if (data) {
                data.isActive = !data.isActive; // Toggle isActive value
                await data.save();
                if (data.isActive) {
                    return res.send({ status: true, subCode: 200, message: "Activated successfully", data: data });
                } else {
                    return res.send({ status: true, subCode: 200, message: "Deactivated successfully", data: data });
                }
            }
            return res.send({
                status: false, subCode: 400, message: "data not found", data: data
            })
        }
        return res.send({ status: false, subCode: 400, message: "Invalid user" })
    } catch (error) {
        console.log("Helper Err:", error);
        return res.send({ status: false, subCode: 400, message: error.message });
    }
};

exports.getOneBatch = async (req, res) => {
    try {
        const token = req.headers.authorization
        // console.log(token);
        const valid = await adminModel.findOne({ token: token, isDelete: false })
        // console.log(valid);
        if (valid) {
            const id = req.params._id
            const data = await batchModel.findOne({ _id: id, isDelete: false }).populate([{path: "student", select: "_id phone name"}])
            // console.log(data);
            if (!data) {
                return res.send({ status: false, subCode: 400, message: "data not exist" })
            }
            if (data.isActive === true) {
                return res.send({ status: true, subCode: 200, message: "Batch detail get successfully ", data: data })
            } else {
                return res.send({ status: false, subCode: 400, message: "data not exist" })
            }
        }
        return res.send({ status: false, subCode: 400, message: "Invalid user" })
    } catch (error) {
        console.log("Helper Err:", error);
        return res.send({ status: false, subCode: 400, message: error.message })
    }
}

exports.getAllBatch = async (req, res) => {
    try {
        const token = req.headers.authorization
        // console.log(token);
        const valid = await adminModel.findOne({ token: token, isDelete: false })
        // console.log(valid);
        if (valid) {
            const course = await batchModel.find({ isDelete: false }).populate([{path: 'student', select: 'firstname _id phone'}]);

            // Filter the user based on isActive and isDelete conditions
            const adminData = [];
            const usersData = [];
            course.forEach(course => {
                if (course.isActive === true && course.isDelete === false) {
                    adminData.push(course);
                    usersData.push(course);
                } else if (course.isActive === false && course.isDelete === false) {
                    adminData.push(course);65
                }
            });
            if (adminData.length === 0) {
                // No user exist for adminData
                return res.send({ status: false, subCode: 400, message: "No data found.", data: [] });
            }
            // if (usersData.length === 0) {
            //     // No user exist for user
            //     return res.send ({ status: false, subCode: 400, message: "No user found for user.", data: [] };
            // }
            adminData.reverse();
            usersData.reverse()
            return res.send({
                status: true,
                subCode: 200,
                message: "Data retrieved successfully.",
                data: {
                    adminData,
                    usersData
                }
            })
        }
        return res.send({ status: false, subCode: 400, message: "Invalid user" })
    } catch (error) {
        console.error("Helper Err:", error);
        return res.send({ status: false, subCode: 400, message: error.message });
    }
};

exports.editBatch = async (req, res) => {
    try {
        // console.log(valid);
        const token = parseJwt(req.headers.authorization);
        // console.log(token);
        const valid = await adminModel.findOne({ token: token, isDelete: false })
        // console.log(valid);
        if (valid) {
            const id = req.body.id
            const courseName = req.body.courseName
            const duration = req.body.duration
            const endDate = req.body.endDate
            const startDate = req.body.startDate
            const instructorName = req.body.instructorName
            const instructorId = req.body.instructorId
            const courseId = req.body.courseId
            const student = JSON.parse(req.body.student)
            // const batchStatus = req.body.batchStatus
            const batchTime = req.body.batchTime
            const batchName = req.body.batchName
            const { ...newData } = { courseName, duration, endDate, startDate, student, batchTime, batchName, instructorName, instructorId, courseId }
            const data = await batchModel.findOneAndUpdate(
                { _id: id, isDelete: false },
                newData
                , { new: true }
            );
            if (!data) {
                return res.send({ status: false, subCode: 400, message: "data not exist" })
            }
            if (data.isDelete === true) {
                // Course with the given id not found
                return res.send({ status: false, subCode: 404, message: "data not found.", data: null });
            }
            return res.send({ status: true, subCode: 200, message: "Batch updated successfully ", data: data })
        }
        return res.send({ status: false, subCode: 400, message: "Invalid user" })
    } catch (error) {
        console.log("Helper Err:", error);
        return res.send({ status: false, subCode: 400, message: error.message })
    }
}

exports.removeBatch = async (req, res) => {
    try {
        const token = parseJwt(req.headers.authorization);
        // console.log(token);
        const valid = await adminModel.findOne({ token: token, isDelete: false })
        // console.log(valid);
        if (valid) {
            const id = req.params._id
            const data = await batchModel.findOneAndUpdate(
                { _id: id, isDelete: false },
                { isActive: false, isDelete: true },
                { new: true }
            );
            if (data)
                return res.send({ status: true, subCode: 200, message: "course Deleted successfully ", data: data })
            else
                return res.send({ status: false, subCode: 400, message: "data not found ", data: data })
        }
        return res.send({ status: false, subCode: 400, message: "Invalid user" })
    } catch (error) {
        console.log("Helper Err:", error);
        return res.send({ status: false, subCode: 400, message: error.message })
    }
}

exports.searchBatch = async (req, res) => {
    try {
        const data = await batchModel.find({ courseName: { $regex: req.body.courseName, $options: 'i' }, isDelete: false });
        if (data.length !== 0) {
            return res.send({
                status: true,
                subCode: 200,
                message: "data retrieved successfully.",
                data: data
            });
        }
        return res.send({
            status: false,
            subCode: 404,
            message: "No data found with the given search term.",
            data: []
        });
    } catch (error) {
        console.error("Helper Err:", error);
        return res.send({
            status: false,
            subCode: 400,
            message: error.message,
            data: []
        });
    }
}

exports.paginationBatch = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = 10;
        const totalCourses = await batchModel.countDocuments();
        // console.log(totalCourses)
        const totalPages = Math.ceil(totalCourses / perPage);
        const courses = await batchModel.find({ isDelete: false })
            .skip((page - 1) * perPage)
            .limit(perPage);
        return res.send({ status: true, subCode: 200, message: "Pagination done successfully.", data: { totalPages, page, courses } })
    } catch (error) {
        console.error("Helper Err:", error);
        return res.send({ status: false, subCode: 400, message: error.message });
    }
}

// exports.setBatchStatus = async (req, res) => {
//     try {
//         const currentDate = new Date()
//         const day = currentDate.getDate().toString().padStart(2, '0');
//         const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
//         const year = currentDate.getFullYear();
//         const formattedDate = `${day}/${month}/${year}`;

//         const batch1 = await batchModel.findAndUpdate(
//             { startDate: formattedDate, isDelete: false },
//             { batchStatus: "On-going" },
//             { new: true })

//         const batch2 = await batchModel.findAndUpdate(
//             { startDate: { $lte: formattedDate }, isDelete: false },
//             { batchStatus: "Pending" },
//             { new: true })

//         const batch3 = await batchModel.findAndUpdate(
//             { endDate: { $gte: formattedDate }, isDelete: false },
//             { batchStatus: "Complete" },
//             { new: true })

//         return res.send({
//             status: true,
//             subCode: 200,
//             message: "Batch status updated successfully."
//         })
//     } catch (error) {
//         console.error("Helper Err:", error);
//         return res.send({ status: false, subCode: 400, message: error.message });
//     }
// }

exports.scheduleInterview = async (req, res) => {
    try {
        const batch = await batchModel.findOne({ batchName: req.body.batchName, isDelete: false })
        const students = batch.student
        const ids = students.map(item => { return item.id })
        // console.log(ids);
        ids.forEach(async (item) => {
            // console.log(item);
            await studentModel.findOneAndUpdate(
                { _id: item },
                {
                    interviewLink: req.body.interviewLink,
                    interviewDate: req.body.interviewDate,
                    interviewStarTime: req.body.interviewStarTime,
                    interviewEndTime: req.body.interviewEndTime,
                    notification: req.body.notification,
                },
                { new: true })
            // console.log("student::", student)
        });
        return res.send({ status: true, subCode: 200, message: `Scheduled interview successfully for ${req.body.batchName}.` })
    } catch (error) {
        console.error("Helper Err:", error);
        return res.send({ status: false, subCode: 400, message: error.message });
    }
}

exports.removeInterview = async (req, res) => {
    try {
        const batch = await batchModel.findOne({ batchName: req.body.batchName, isDelete: false })
        const students = batch.student
        const ids = students.map(item => { return item.id })
        // console.log(ids);
        ids.forEach(async (item) => {
            // console.log(item);
            await studentModel.findOneAndUpdate(
                { _id: item },
                {
                    interviewLink: "",
                    interviewDate: "",
                    interviewStarTime: "",
                    interviewEndTime: "",
                    notification: "",
                },
                { new: true })
            // console.log("student::", student)
        });
        return res.send({ status: true, subCode: 200, message: `Removed interview successfully for ${req.body.batchName}.` })
    } catch (error) {
        console.error("Helper Err:", error);
        return res.send({ status: false, subCode: 400, message: error.message });
    }
}