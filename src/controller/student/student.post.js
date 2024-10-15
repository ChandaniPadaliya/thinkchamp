const { studentModel } = require(`../../model/student.model`)
const { adminModel } = require('../../model/admin.model')
const { enrollmentModel } = require('../../model/enrollment.model')
const { generateStudentToken, parseJwt } = require('../../middleware/auth')
const secret_key = "mysecretkey"
const nodemailer = require('nodemailer')


exports.sendOTP = async (req, res) => {
    try {
        const otp = Math.floor(Math.random() * (9999 - 1000) + 1000)
        // Configure nodemailer
        if (req.body.email !== "") {
            const data = await studentModel.findOneAndUpdate(
                { email: req.body.email, isDelete: false },
                { otp: otp },
                { new: true });
            if (data) {
                let transporter = nodemailer.createTransport({
                    host: "smtp-relay.sendinblue.com",
                    // host: "abhishek.vedanshtechnovision@gmail.com",
                    port: 587,
                    auth: {
                        user: 'abhishek.vedanshtechnovision@gmail.com',
                        pass: 'I768KV29BMkrvYgx'
                    },
                });
                // Send email
                let info = await transporter.sendMail({
                    from: '<testing@ThinkChamp.com>', // sender email
                    to: req.body.email, // recipient email
                    subject: 'OTP for forgot password',
                    text: `OTP for set your password ${otp}`
                });
                return res.send({ status: true, subCode: 200, message: "Otp generated successfully ", data: data })
            }
            else {
                return res.send({ status: false, subCode: 400, message: "Email not exists." })
            }
        }
        return res.send({ status: false, subCode: 400, message: "Enter email." })

    } catch (error) {
        console.error("Helper Err:", error);
        return res.send({ status: false, subCode: 400, message: error.message });
    }
}

exports.verifyOtp = async (req, res) => {
    try {
        const verify = await studentModel.findOne({ otp: req.body.otp, email: req.body.email, isDelete: false })
        // console.log(verify);
        if (!verify) {
            return res.send({ status: false, subCode: 400, message: "Invalid otp." })
        }
        verify.isVerify = true
        verify.save()
        return res.send({ status: true, subCode: 200, message: "Otp verify successfully ", data: verify })
    } catch (error) {
        console.error("Helper Err:", error);
        return res.send({ status: false, subCode: 400, message: error.message });
    }
}

exports.addStudent = async (req, res) => {
    try {
        const token = req.headers.authorization;
        //  console.log(token);
        const valid = await adminModel.findOne({ token: token, isDelete: false })
        // console.log(valid);
        if (valid) {
            // const file = req.files
            // if (!file || !file.file || !file.file[0] || !file.file[0].filename) {
            //     return res.send({ status: false, subCode: 400, message: "Image is required" })
            // }
            if (req.body.image === "") {
                return res.send({ status: false, subCode: 400, message: "Image is required" })
            }
            
            if (req.body.firstName === "") {
                return res.send({ status: false, subCode: 400, message: "First name is required" })
            }
            if (req.body.lastName === "") {
                return res.send({ status: false, subCode: 400, message: "Last name is required" })
            }
            if (req.body.gender === "") {
                return res.send({ status: false, subCode: 400, message: "Gender is required" })
            }
            if (req.body.dateOfBirth === "") {
                return res.send({ status: false, subCode: 400, message: "Date of birth is required" })
            }
            if (req.body.email === "") {
                return res.send({ status: false, subCode: 400, message: "Email is required" })
            }
            if (req.body.password === "") {
                return res.send({ status: false, subCode: 400, message: "Password is required" })
            }
            if (req.body.phone === "") {
                return res.send({ status: false, subCode: 400, message: "Phone is required" })
            }
            if (req.body.age === "") {
                return res.send({ status: false, subCode: 400, message: "Age is required" })
            }
            if (req.body.admissionDate === "") {
                return res.send({ status: false, subCode: 400, message: "Admission date is required" })
            }
            if (req.body.fatherName === "") {
                return res.send({ status: false, subCode: 400, message: "Father name is required" })
            }
            if (req.body.courseName === "") {
                return res.send({ status: false, subCode: 400, message: "Course name is required" })
            }
            if (req.body.batchTime === "") {
                return res.send({ status: false, subCode: 400, message: "Batch time is required" })
            }
            if (req.body.instructorName === "") {
                return res.send({ status: false, subCode: 400, message: "Instructor name is required" })
            }
            if (req.body.address === "") {
                return res.send({ status: false, subCode: 400, message: "Address is required" })
            }
            const phoneMatch = await studentModel.findOne({ phone: req.body.phone, isDelete: false })
            if (phoneMatch) {
                return res.send({ status: false, subCode: 400, message: "Phone already exist" })
            }
            const emailMatch = await studentModel.findOne({ email: req.body.email, isDelete: false })
            if (emailMatch) {
                return res.send({ status: false, subCode: 400, message: "email already exist" })
            }
            const firstName = req.body.firstName
            const lastName = req.body.lastName
            const fullName = `${firstName} ${lastName}`
            const age = req.body.age
            const gender = req.body.gender
            const email = req.body.email
            const dateOfBirth = req.body.dateOfBirth
            const admissionDate = req.body.admissionDate
            const password = req.body.password
            const fatherName = req.body.fatherName
            const phone = req.body.phone
            const courseName = req.body.courseName
            const courseId = req.body.courseId
            const batchTime = req.body.batchTime
            const studentName = req.body.studentName
            const studentId = req.body.studentId
            const address = req.body.address
            // const userId = req.body.userId
            const image = req.body.image
            const roleName = "Student"
            const roleId = "65619c7e20fc5942e9bd88c8"
            const instructorName = req.body.instructorName
            const instructorId = req.body.instructorId
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            const enrollment = await enrollmentModel.find()
            console.log("enrollment",enrollment);
            // const enrollments = enrollment.map(item => item.enrollmentNo)
            // const lastEnrollment = enrollments[enrollments.length - 1]
            // const lastENumber = parseInt(lastEnrollment.split('/')[3]);
            // const startE = lastEnrollment.split('/')[0]
            // const startEnrollment = `${startE}/${year}/${month}`
            // const newEnrollmentNumber = `${startEnrollment}/${String(lastENumber + 1).padStart(4, '0')}`
            // console.log(newEnrollmentNumber)
            // const enrollmentNo = newEnrollmentNumber

            const data = { firstName, lastName, age, email, gender, dateOfBirth, admissionDate, password, enrollmentNo, fatherName, phone, courseName, courseId, batchTime, studentName, studentId, address, roleName, roleId, image, instructorId, instructorName, fullName }
            const saveData = new studentModel(data)
            // await saveData.save()
            // const newEntry = {
            //     enrollmentNo: saveData.enrollmentNo,
            //     studentName: `${saveData.firstName} ${saveData.lastName}`,
            //     studentId: saveData._id
            // }
            // const updatedEnrollments = await enrollmentModel.create(newEntry)
            console.log(updatedEnrollments);
            return res.send({ status: true, subCode: 200, message: "Student added successfully ", data: saveData })
        }
        return res.send({ status: false, subCode: 400, message: "Invalid user" })
    } catch (error) {
        console.error("H elper Err:", error);
        return res.send({ status: false, subCode: 400, message: error.message });
    }
}

exports.activeStudent = async (req, res) => {
    try {
        const token = parseJwt(req.headers.authorization);
        // console.log(token);
        const valid = await adminModel.findOne({ token: token, isDelete: false })
        // console.log(valid);
        if (valid) {
            const id = req.params._id
            const data = await studentModel.findOne({ _id: id, isDelete: false });
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

exports.getOneStudent = async (req, res) => {
    try {
        const token = parseJwt(req.headers.authorization);
        // console.log(token);
        const valid = await adminModel.findOne({ token: token, isDelete: false })
        // console.log(valid);
        if (valid) {
            const id = req.params._id
            const data = await studentModel.findOne({ _id: id, isDelete: false })
            // console.log(data);
            if (!data) {
                return res.send({ status: false, subCode: 400, message: "data not exist" })
            }
            if (data.isActive === true) {
                return res.send({ status: true, subCode: 200, message: "student get successfully ", data: data })
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

exports.getAllStudent = async (req, res) => {
    try {
       
        const token = req.headers.authorization
        // console.log(token);
        const valid = await adminModel.findOne({ token: token, isDelete: false })
    //  console.log(valid);
        if (valid) {
            const student = await studentModel.find({ isDelete: false });
            // Filter the user based on isActive and isDelete conditions
            const adminData = [];
            const usersData = [];
            student.forEach(student => {
                if (student.isActive === true && student.isDelete === false) {
                    adminData.push(student);
                    usersData.push(student);
                } else if (student.isActive === false && student.isDelete === false) {
                    adminData.push(student);
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

exports.getAllStudentByCourseId = async (req, res) => {
    try {
        const token = parseJwt(req.headers.authorization);
        console.log(token);
        const valid = await adminModel.findOne({ token: token, isDelete: false })
        // console.log(valid);
        if (valid) {
            const id = req.body.courseId
            const student = await studentModel.find({ courseId: id, isDelete: false });
            // Filter the user based on isActive and isDelete conditions
            const adminData = [];
            const usersData = [];
            student.forEach(student => {
                if (student.isActive === true && student.isDelete === false) {
                    adminData.push(student);
                    usersData.push(student);
                } else if (student.isActive === false && student.isDelete === false) {
                    adminData.push(student);
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

exports.editStudent = async (req, res) => {
    try {
        const token = parseJwt(req.headers.authorization);
        // console.log(token);
        const valid = await adminModel.findOne({ token: token, isDelete: false })
        // console.log(valid);
        if (valid) {
            const id = req.body.id
            const file = req.files
            const content = await studentModel.findOne({ _id: id, isDelete: false })
            if (!content) {
                return res.send({ status: false, subCode: 400, message: "data not exist" })
            }
            const firstName = req.body.firstName
            const lastName = req.body.lastName
            const fullName = `${firstName} ${lastName}`
            const age = req.body.age
            const gender = req.body.gender
            const email = req.body.email
            const dateOfBirth = req.body.dateOfBirth
            const admissionDate = req.body.admissionDate
            const password = req.body.password
            const fatherName = req.body.fatherName
            const phone = req.body.phone
            const courseName = req.body.courseName
            const courseId = req.body.courseId
            const batchTime = req.body.batchTime
            const studentName = req.body.studentName
            const studentId = req.body.studentId
            const address = req.body.address
            const userId = req.body.userId
            let image = req.body.image
            const { ...newData } = { firstName, lastName, age, email, gender, dateOfBirth, admissionDate, password, fatherName, phone, courseName, courseId, batchTime, studentName, studentId, address, userId, image, fullName }

            const data = await studentModel.findOneAndUpdate(
                { _id: id, isDelete: false },
                newData
                , { new: true }
            );

            if (data.isDelete === true) {
                // Course with the given id not found
                return res.send({ status: false, subCode: 404, message: "Student not found.", data: null });
            }
            return res.send({ status: true, subCode: 200, message: "Student updated successfully ", data: data })
        }
        return res.send({ status: false, subCode: 400, message: "Invalid user" })
    } catch (error) {
        console.log("Helper Err:", error);
        return res.send({ status: false, subCode: 400, message: error.message })
    }
}

exports.removeStudent = async (req, res) => {
    try {
        const token = parseJwt(req.headers.authorization);
        // console.log(token);
        const valid = await adminModel.findOne({ token: token, isDelete: false })
        // console.log(valid);
        if (valid) {
            const id = req.params._id
            const data = await studentModel.findOneAndUpdate(
                { _id: id, isDelete: false },
                { isActive: false, isDelete: true },
                { new: true }
            );
            if (data)
                return res.send({ status: true, subCode: 200, message: "Student Deleted successfully ", data: data })
            else
                return res.send({ status: false, subCode: 400, message: "data not found ", data: data })
        }
        return res.send({ status: false, subCode: 400, message: "Invalid user" })
    } catch (error) {
        console.log("Helper Err:", error);
        return res.send({ status: false, subCode: 400, message: error.message })
    }
}

exports.searchStudent = async (req, res) => {
    try {
        const data = await studentModel.find({ courseName: { $regex: req.body.courseName, $options: 'i' }, isDelete: false });
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

exports.paginationStudent = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = 10;
        const totalstudents = await studentModel.countDocuments();
        // console.log(totalstudents)
        const totalPages = Math.ceil(totalstudents / perPage);
        const students = await studentModel.find({ isDelete: false })
            .skip((page - 1) * perPage)
            .limit(perPage);
        return res.send({ status: true, subCode: 200, message: "Pagination done successfully.", data: { totalPages, page, students } })
    } catch (error) {
        console.error("Helper Err:", error);
        return res.send({ status: false, subCode: 400, message: error.message });
    }
}

exports.loginStudent = async (req, res) => {
    try {
        const data = req.body;
        // console.log(data);
        if (data.email === "") {
            return res.send({ status: false, subCode: 400, message: "Email is required" })
        }
        if (data.password === "") {
            return res.send({ status: false, subCode: 400, message: "Password is required" })
        }
        const user = await studentModel.findOne({ email: data.email, password: data.password, isDelete: false });

        if (user) {
            console.log('User found:', user);
            console.log('Data.password:', data.password);
            console.log('User.password:', user.password);

            // const hash = bcrypt.compareSync(data.password, user.password);
            // console.log('password comparison result:', hash);

            const id = user._id;
            const token = generateStudentToken(id, secret_key);
            console.log('Generated Token:', token);

            const updatedData = await studentModel.findOneAndUpdate(
                { email: user.email, isDelete: false },
                { isLogin: true, token: token },
                { new: true, select: "-__v -password" }
            );

            // const updatedUser = { ...updatedData.toObject(), token };
            return res.send({
                status: true,
                message: "login successfully",
                subCode: 200,
                data: updatedData
            });

        } else {
            return res.send({
                status: false,
                message: "User not found",
                subCode: 400
            });
        }
    } catch (err) {
        console.error("Helper Err:", error);
        return res.send({ status: false, subCode: 400, message: err.message });
    }
};

exports.forgotPassword = async (req, res) => {
    try {
        const data = await studentModel.findOne({ email: req.body.email, isDelete: false });
        if (!data || !req.body.newPassword || !req.body.confirmPassword) {
            return { status: false, subCode: 400, message: "Give correct id or password " };
        }
        if (req.body.newPassword === req.body.confirmPassword) {
            const password = req.body.confirmPassword
            const updatePassword = await studentModel.findOneAndUpdate({ email: req.body.email, isDelete: false }, { password: password }, { new: true })
            return res.send({ status: true, subCode: 200, message: 'Password updated successfully', data: updatePassword });
        } else {
            return res.send({ status: false, subCode: 400, message: "Both password fields are not match" });
        }
    } catch (error) {
        console.error("Helper Err:", error);
        return res.send({ status: false, subCode: 400, message: error.message });
    }
}

exports.setNewPassword = async (req, res) => {
    try {
        const { email, oldPassword, newPassword, confirmPassword } = req.body
        const data = await studentModel.findOne({ email: email, isDelete: false })
        if (oldPassword !== data.password) {
            return res.send({ status: false, subCode: 400, message: "Give the correct old password" });
        }
        if (newPassword !== confirmPassword) {
            return res.send({ status: false, subCode: 400, message: "New password and confirm password don't match" });
        }
        const updateData = await studentModel.findOneAndUpdate({ email: email, isDelete: false }, { password: confirmPassword }, { new: true })
        return res.send({ status: true, subCode: 200, message: "Password updated successfully", data: updateData })
    } catch (error) {
        console.log(error);
        return res.send({ status: false, subCode: 400, message: error.message });
    }
}










