const { courseModel } = require('../../model/course.model')
const { adminModel } = require('../../model/admin.model')
const { parseJwt } = require('../../middleware/auth')
// const baseUrl = "D:/xampp/htdocs/ThinkChamp/Backend/src/uploads/"
// const baseUrl = "http://192.168.29.194/ThinkChamp/Backend/src/uploads/"

exports.addCourse = async (req, res) => {
    try {
        const token = req.headers.authorization;
        // console.log(token);
        const valid = await adminModel.findOne({ token: token, isDelete: false })
        // console.log(valid);
        if (valid) {
            const file = req.files
            if (req.body.courseName === "") {
                return res.send({ status: false, subCode: 400, message: "Course name is required" })
            }
            if (req.body.duration === "") {
                return res.send({ status: false, subCode: 400, message: "Duration is required" })
            }
            if (req.body.price === "") {
                return res.send({ status: false, subCode: 400, message: "Price is required" })
            }
            if (req.body.title === "") {
                return res.send({ status: false, subCode: 400, message: "Title is required" })
            }
            if (req.body.category === "") {
                return res.send({ status: false, subCode: 400, message: "Category is required" })
            }
            if (req.body.thumbnail === "") {
                return res.send({ status: false, subCode: 400, message: "Thumbnail is required" })
            }
            if (req.body.batchesCount === "") {
                return res.send({ status: false, subCode: 400, message: "Batches count is required" })
            }
            if (req.body.studentCount === "") {
                return res.send({ status: false, subCode: 400, message: "Student count is required" })
            }
            if (req.body.instructorCount === "") {
                return res.send({ status: false, subCode: 400, message: "instructor count is required" })
            }
            if (req.body.mode === "") {
                return res.send({ status: false, subCode: 400, message: "Mode is required" })
            }
            if (req.body.batchStartDate === "") {
                return res.send({ status: false, subCode: 400, message: "Batch Start Date is required" })
            }
            if (req.body.image === "") {
                return res.send({ status: false, subCode: 400, message: "Image is required" })
            }

            const course = await courseModel.findOne({ courseName: req.body.courseName, isDelete: false })
            if (!course) {
                const courseName = req.body.courseName
                const duration = req.body.duration
                const price = req.body.price
                const title = req.body.title
                const thumbnail = req.body.thumbnail
                const batchesCount = req.body.batchesCount
                const studentCount = req.body.studentCount
                const instructorCount = req.body.instructorCount
                const image = req.body.image
                const mode = req.body.mode
                const category = req.body.category
                const batchStartDate = req.body.batchStartDate
                const data = { courseName, duration, price, title, studentCount, instructorCount, image, thumbnail, batchesCount, mode, batchStartDate, category }
                const saveData = new courseModel(data)
                await saveData.save()
                return res.send({ status: true, subCode: 200, message: "Course added successfully ", data: saveData })
            }
            else {
                return res.send({ status: false, subCode: 400, message: "Course already exists." })
            }
        }
        return res.send({ status: false, subCode: 400, message: "Invalid user" })
    } catch (error) {
        console.log("Helper error: " + error)
        return res.send({ status: false, subCode: 400, message: error.message })
    }
}

exports.activeCourse = async (req, res) => {
    try {
        const token = parseJwt(req.headers.authorization);
        // console.log(token);
        const valid = await adminModel.findOne({ token: token, isDelete: false })
        // console.log(valid);
        if (valid) {
            const id = req.params._id
            const data = await courseModel.findOne({ _id: id, isDelete: false });
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

exports.getOneCourse = async (req, res) => {
    try {
        const token = req.headers.authorization
        // console.log(token);
        const valid = await adminModel.findOne({ token: token, isDelete: false })
        // console.log(valid);
        if (valid) {
            const id = req.params._id
            const data = await courseModel.findOne({ _id: id, isDelete: false })
            // console.log(data);
            if (!data) {
                return res.send({ status: false, subCode: 400, message: "data not exist" })
            }
            if (data.isActive === true) {
                return res.send({ status: true, subCode: 200, message: "Course get successfully ", data: data })
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

exports.getAllCourse = async (req, res) => {
    try {
        const token = req.headers.authorization
        // console.log(token);
        const valid = await adminModel.findOne({ token: token, isDelete: false })
        console.log(valid);
        if (valid) {
            const course = await courseModel.find({ isDelete: false });
            // Filter the user based on isActive and isDelete conditions
            const adminData = [];
            const usersData = [];
            course.forEach(course => {
                if (course.isActive === true && course.isDelete === false) {
                    adminData.push(course);
                    usersData.push(course);
                } else if (course.isActive === false && course.isDelete === false) {
                    adminData.push(course);
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

exports.editCourse = async (req, res) => {
    try {
        const token = parseJwt(req.headers.authorization);
        // console.log(token);
        const valid = await adminModel.findOne({ token: token, isDelete: false })
        // console.log(valid);
        if (valid) {
            const id = req.body.id
            const file = req.files
            const courseName = req.body.courseName
            const duration = req.body.duration
            const price = req.body.price
            const title = req.body.title
            const thumbnail = req.body.thumbnail
            const batchesCount = req.body.batchesCount
            const studentCount = req.body.studentCount
            const instructorCount = req.body.instructorCount
            const mode = req.body.mode
            const batchStartDate = req.body.batchStartDate
            const category = req.body.category

            let image
            if (!file || !file.file || !file.file[0] || !file.file[0].filename) {
                const content = await courseModel.findOne({ _id: id, isDelete: false })
                // console.log(content)
                image = content.image
            } else {
                image = baseUrl + file.file[0].filename
            }

            const { ...newData } = { courseName, duration, price, title, studentCount, instructorCount, image, thumbnail, batchesCount, mode, batchStartDate, category }
            const data = await courseModel.findOneAndUpdate(
                { _id: id, isDelete: false },
                newData,
                { new: true }
            );
            
            if (!data) {
                return res.send({ status: false, subCode: 400, message: "data not exist" })
            }
            if (data.isDelete === true) {
                // Course with the given id not found
                return res.send({ status: false, subCode: 404, message: "course not found.", data: null });
            }
            return res.send({ status: true, subCode: 200, message: "course updated successfully ", data: data })
        }
        return res.send({ status: false, subCode: 400, message: "Invalid user" })
    } catch (error) {
        console.log("Helper Err:", error);
        return res.send({ status: false, subCode: 400, message: error.message })
    }
}

exports.removeCourse = async (req, res) => {
    try {
        const token = parseJwt(req.headers.authorization);
        // console.log("token", token);
        const valid = await adminModel.findOne({ token: token, isDelete: false })
        // console.log(valid);
        if (valid) {
            const id = req.params._id
            const data = await courseModel.findOneAndUpdate(
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

exports.searchCourse = async (req, res) => {
    try {
        const data = await courseModel.find({ courseName: { $regex: req.body.courseName, $options: 'i' }, isDelete: false });
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

exports.paginationCourse = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = 10;
        const totalCourses = await courseModel.countDocuments();
        // console.log(totalCourses)
        const totalPages = Math.ceil(totalCourses / perPage);
        const courses = await courseModel.find({ isDelete: false })
            .skip((page - 1) * perPage)
            .limit(perPage);
        return res.send({ status: true, subCode: 200, message: "Pagination done successfully.", data: { totalPages, page, courses } })
    } catch (error) {
        console.error("Helper Err:", error);
        return res.send({ status: false, subCode: 400, message: error.message });
    }
}