const { adminModel } = require('../../model/admin.model')
const { generateAdminToken, verifyAdminToken } = require('../../middleware/auth')
const secret_key = process.env.TOKEN_KEY
const nodemailer = require('nodemailer')


exports.addAdmin = async (req, res) => {
    try {
        if (req.body.name === "") {
            return res.send({ status: false, subCode: 400, message: "Name is required." })
        }
        if (req.body.gender === "") {
            return res.send({ status: false, subCode: 400, message: "Gender is required." })
        }
        if (req.body.dateOfBirth === "") {
            return res.send({ status: false, subCode: 400, message: "Date of birth is required." })
        }
        if (req.body.email === "") {
            return res.send({ status: false, subCode: 400, message: "Email is required." })
        }
        if (req.body.phone === "") {
            return res.send({ status: false, subCode: 400, message: "Phone is required." })
        }
        if (req.body.password === "") {
            return res.send({ status: false, subCode: 400, message: "Password is required." })
        }
        const phoneMatch = await adminModel.findOne({ phone: req.body.phone, isDelete: false })
        if (phoneMatch) {
            return res.send({ status: false, subCode: 400, message: "Phone already exist" })
        }
        const emailMatch = await adminModel.findOne({ email: req.body.email, isDelete: false })
        if (emailMatch) {
            return res.send({ status: false, subCode: 400, message: "email already exist" })
        }
        const name = req.body.name
        const gender = req.body.gender
        const email = req.body.email
        const dateOfBirth = req.body.dateOfBirth
        const password = req.body.password
        const phone = req.body.phone
        const roleName = "Admin"
        const roleId = "65619a2ba165e2d838c0299c"
        const data = { name, gender, email, password, dateOfBirth, phone, roleName, roleId }
        const saveData = new adminModel(data)
        await saveData.save()
        return res.send({ status: true, subCode: 200, message: "Admin added successfully ", data: saveData })

    } catch (error) {
        console.log("Helper error: " + error)
        return res.send({ status: false, subCode: 400, message: error.message })
    }
}

exports.loginAdmin = async (req, res) => {
    try {
        const data = req.body;
        // console.log(data);
        if (data.email === "") {
            return res.send({ status: false, subCode: 400, message: "Email is required" })
        }
        if (data.password === "") {
            return res.send({ status: false, subCode: 400, message: "Password is required" })
        }
        const user = await adminModel.findOne({ email: data.email, password: data.password, isDelete: false });

        if (user) {
            // console.log('User found:', user);
            // console.log('Data.password:', data.password);
            // console.log('User.password:', user.password);
            // const hash = bcrypt.compareSync(data.password, user.password);
            // console.log('password comparison result:', hash);

            const id = user._id;
            const token = generateAdminToken(id, secret_key);
            console.log('Generated Token:', token);

            const updatedData = await adminModel.findOneAndUpdate(
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
        console.log(err);
        return res.send({
            status: false,
            message: err.message,
            subCode: 400
        });
    }
};

exports.activeAdmin = async (req, res) => {
    try {
        const id = req.params._id
        const data = await adminModel.findOne({ _id: id, isDelete: false });
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
    } catch (error) {
        console.log("Helper Err:", error);
        return res.send({ status: false, subCode: 400, message: error.message });
    }
};

exports.getOneAdmin = async (req, res) => {
    try {
        const id = req.params._id
        const data = await adminModel.findOne({ _id: id, isDelete: false })
        // console.log(data);
        if (!data) {
            return res.send({ status: false, subCode: 400, message: "data not exist" })
        }
        if (data.isActive === true) {
            return res.send({ status: true, subCode: 200, message: "Admin get successfully ", data: data })
        } else {
            return res.send({ status: false, subCode: 400, message: "data not exist" })
        }
    } catch (error) {
        console.log("Helper Err:", error);
        return res.send({ status: false, subCode: 400, message: error.message })
    }
}

exports.getAllAdmin = async (req, res) => {
    try {
        const admin = await adminModel.find({ isDelete: false });
        // Filter the user based on isActive and isDelete conditions
        const adminData = [];
        const usersData = [];
        admin.forEach(admin => {
            if (admin.isActive === true && admin.isDelete === false) {
                adminData.push(admin);
                usersData.push(admin);
            } else if (admin.isActive === false && admin.isDelete === false) {
                adminData.push(admin);
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
    } catch (error) {
        console.error("Helper Err:", error);
        return res.send({ status: false, subCode: 400, message: error.message });
    }
};

exports.editAdmin = async (req, res) => {
    try {
        const id = req.body.id
        // const file = req.files
        const content = await adminModel.findOne({ _id: id, isDelete: false })
        if (!content) {
            return res.send({ status: false, subCode: 400, message: "data not exist" })
        }
        const name = req.body.name
        const gender = req.body.gender
        const email = req.body.email
        const dateOfBirth = req.body.dateOfBirth
        const password = req.body.password
        const phone = req.body.phone

        // let image
        // if (!file || !file.file || !file.file[0] || !file.file[0].filename) {
        //     // console.log(content)
        //     image = content.image
        // } else {
        //     image = baseUrl + file.file[0].filename
        // }
        const { ...newData } = { name, gender, email, password, dateOfBirth, phone }
        const data = await adminModel.findOneAndUpdate(
            { _id: id, isDelete: false },
            newData
            , { new: true }
        );
        if (data.isDelete === true) {
            // admin with the given id not found
            return res.send({ status: false, subCode: 404, message: "Admin not found.", data: null });
        }
        return res.send({ status: true, subCode: 200, message: "Admin updated successfully ", data: data })
    } catch (error) {
        console.log("Helper Err:", error);
        return res.send({ status: false, subCode: 400, message: error.message })
    }
}

exports.removeAdmin = async (req, res) => {
    try {
        const id = req.params._id
        const data = await adminModel.findOneAndUpdate(
            { _id: id, isDelete: false },
            { isActive: false, isDelete: true },
            { new: true }
        );
        if (data)
            return res.send({ status: true, subCode: 200, message: "Admin Deleted successfully ", data: data })
        else
            return res.send({ status: false, subCode: 400, message: "data not found ", data: data })
    } catch (error) {
        console.log("Helper Err:", error);
        return res.send({ status: false, subCode: 400, message: error.message })
    }
}

exports.searchAdmin = async (req, res) => {
    try {
        const data = await adminModel.find({ adminName: { $regex: req.body.adminName, $options: 'i' }, isDelete: false });
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

exports.paginationAdmin = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = 10;
        const totalAdmins = await adminModel.countDocuments();
        // console.log(totalAdmins)
        const totalPages = Math.ceil(totalAdmins / perPage);
        const admins = await adminModel.find({ isDelete: false })
            .skip((page - 1) * perPage)
            .limit(perPage);
        return res.send({ status: true, subCode: 200, message: "Pagination done successfully.", data: { totalPages, page, admins } })
    } catch (error) {
        console.error("Helper Err:", error);
        return res.send({ status: false, subCode: 400, message: error.message });
    }
}

exports.sendOTP = async (req, res) => {
    try {
        const otp = Math.floor(Math.random() * (9999 - 1000) + 1000)
        // Configure nodemailer
        if (req.body.email !== "") {
            const data = await adminModel.findOneAndUpdate(
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
        const verify = await adminModel.findOne({ otp: req.body.otp, email: req.body.email, isDelete: false })
        console.log(verify);
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

exports.forgotPassword = async (req, res) => {
    try {
        const data = await adminModel.findOne({ email: req.body.email, isDelete: false });
        if (!data || !req.body.newPassword || !req.body.confirmPassword) {
            return res.send({ status: false, subCode: 400, message: "Give correct id or password " });
        }
        if (req.body.newPassword === req.body.confirmPassword) {
            const password = req.body.confirmPassword
            const updatePassword = await adminModel.findOneAndUpdate({ email: req.body.email, isDelete: false }, { password: password }, { new: true })
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
        const data = await adminModel.findOne({ email: email, isDelete: false })
        if (oldPassword !== data.password) {
            return res.send({ status: false, subCode: 400, message: "Give the correct old password" });
        }
        if (newPassword !== confirmPassword) {
            return res.send({ status: false, subCode: 400, message: "New password and confirm password don't match" });
        }
        const updateData = await adminModel.findOneAndUpdate({ email: email, isDelete: false }, { password: confirmPassword }, { new: true })
        return res.send({ status: true, subCode: 200, message: "Password updated successfully", data: updateData })
    } catch (error) {
        console.log(error);
        return res.send({ status: false, subCode: 400, message: error.message });
    }
}




