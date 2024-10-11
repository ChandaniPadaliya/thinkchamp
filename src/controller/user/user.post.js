const { userModel } = require("../../model/user.model")
const bcrypt = require('bcryptjs')
const secret_key = process.env.TOKEN_KEY
const { generateToken } = require('../../middleware/auth')
const mongoDbserviceUser = require("../../services/mongoDbService")({model: userModel})

exports.paginationUser = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = 10;
        const totalUsers = await userModel.countDocuments();
        // console.log(totalUsers)
        const totalPages = Math.ceil(totalUsers / perPage);
        const users = await userModel.find({ isDelete: false })
            .skip((page - 1) * perPage)
            .limit(perPage);
        return res.send({ status: true, subCode: 200, message: "Pagination done successfully.", data: { totalPages, page, users } })
    } catch (error) {
        console.error("Helper Err:", error);
        return res.send({ status: false, subCode: 400, message: error.message });
    }
}

exports.addUser = async (req, res) => {
    try {
        if (req.body.firstName === "") {
            return res.send({ status: false, subCode: 400, message: "First name is required" })
        }
        if (req.body.lastName === "") {
            return res.send({ status: false, subCode: 400, message: "Last name is required" })
        }
        if (req.body.qualification === "") {
            return res.send({ status: false, subCode: 400, message: "Qualification is required" })
        }
        if (req.body.collegeORcompany === "") {
            return res.send({ status: false, subCode: 400, message: "college/company is required" })
        }
        if (req.body.email === "") {
            return res.send({ status: false, subCode: 400, message: "Email is required" })
        }
        if (req.body.phone === "") {
            return res.send({ status: false, subCode: 400, message: "Phone is required" })
        }
        if (req.body.Password === "") {
            return res.send({ status: false, subCode: 400, message: "Password is required" })
        }
        const phone = await userModel.findOne({ phone: req.body.phone, isDelete: false })
        if (phone) {
            return res.send({ status: false, subCode: 400, message: "Phone already exist" })
        }
        const email = await userModel.findOne({ email: req.body.email, isDelete: false })
        if (email) {
            return res.send({ status: false, subCode: 400, message: "email already exist" })
        }
        const fullName = `${req.body.firstName} ${req.body.lastName}`
        console.log(fullName);
        const user = await userModel.findOne({ fullName: fullName, isDelete: false })
        if (!user) {
            const psw = req.body.Password
            // console.log(psw);
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(psw, salt);
            // console.log(hash);
            const { ...data } = req.body
            data.Password = hash
            const saveData = new userModel(data)
            saveData.fullName = fullName
            await saveData.save()
            return res.send({ status: true, subCode: 200, message: "user added successfully ", data: saveData })
        } else {
            return res.send({ status: false, subCode: 400, message: "user already exist" })
        }
    } catch (error) {
        console.log("Helper Err:", error);
        return res.send({ status: false, subCode: 400, message: error.message })
    }
}

exports.removeUser = async (req, res) => {
    try {
        const id = req.params._id
        const data = await userModel.findOneAndUpdate(
            { _id: id, isDelete: false },
            { isActive: false, isDelete: true },
            { new: true }
        );
        if (data)
            return res.send({ status: true, subCode: 200, message: "user Deleted successfully ", data: data })
        else
            return res.send({ status: false, subCode: 400, message: "data not found ", data: data })
    } catch (error) {
        console.log("Helper Err:", error);
        return res.send({ status: false, subCode: 400, message: error.message })
    }
}

exports.searchUser = async (req, res) => {
    try {
        const data = await userModel.find({ userName: { $regex: req.body.userName, $options: 'i' }, isDelete: false });
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

exports.activeUser = async (req,res) => {
    try {
        const id = req.params._id
        const data = await userModel.findOne({ _id: id, isDelete: false });
        if (data) {
            data.isActive = !data.isActive; // Toggle isActive value
            await data.save();
            if (data.isActive) {
                return res.send({ status: true, subCode: 200, message: "user activated successfully", data: data });
            } else {
                return res.send({ status: true, subCode: 200, message: "user deactivated successfully", data: data });
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

exports.editUser = async (req, res) => {
    try {
        const id = req.body.id;
        const { ...newData } = req.body
        const data = await userModel.findOneAndUpdate(
            { _id: id, isDelete: false },
            newData
            , { new: true }
        );
        if (!data) {
            return res.send({ status: false, subCode: 400, message: "data not found ", data: data })
        }
        if (data.isDelete === true) {
            // Course with the given id not found
            return res.send({ status: false, subCode: 404, message: "user not found.", data: null });
        }
        return res.send({ status: true, subCode: 200, message: "user updated successfully ", data: data })
    } catch (error) {
        console.log("Helper Err:", error);
        return res.send({ status: false, subCode: 400, message: error.message })
    }
}

exports.getOneUser = async (req,res) => {
    try {
        const id = req.params._id
        const data = await userModel.findOne({ _id: id, isDelete: false })
        if (!data) {
            return res.send({ status: false, subCode: 400, message: "data not found ", data: data })
        }
        if (data.isActive === true) {
            return res.send({ status: true, subCode: 200, message: "user get successfully ", data: data })
        } else {
            return res.send({ status: false, subCode: 400, message: "data not exist" })
        }
    } catch (error) {
        console.log("Helper Err:", error);
        return res.send({ status: false, subCode: 400, message: error.message })
    }
}

exports.getAllUser = async (req,res) => {
    try {
        // Find all categories, excluding the '__v' and 'isActive' fields
        const user = await userModel.find({isDelete:false});
        // Filter the user based on isActive and isDelete conditions
        const adminData = [];
        const usersData = [];
        user.forEach(user => {
            if (user.isActive === true && user.isDelete === false) {
                adminData.push(user);
                usersData.push(user);
            } else if (user.isActive === false && user.isDelete === false) {
                adminData.push(user);
            }
        });
        if (adminData.length === 0) {
            // No user exist for adminData
            return res.send({ status: false, subCode: 400, message: "No user found.", data: [] });
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
            message: "user retrieved successfully.",
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

exports.loginUser = async (req, res) => {
    try {
        const data = req.body;
        // console.log(data);
        if (data.email === "") {
            return res.send({ status: false, subCode: 400, message: "Email is required" })
        }
        if (data.Password === "") {
            return res.send({ status: false, subCode: 400, message: "Password is required" })
        }
        const user = await userModel.findOne({ email: data.email });
        if (user) {
            console.log('User found:', user);
            console.log('Data.Password:', data.Password);
            console.log('User.Password:', user.Password);

            const hash = bcrypt.compareSync(data.Password, user.Password);
            console.log('Password comparison result:', hash);

            if (hash === true) {
                // const updatedData = await userModel.findOneAndUpdate(
                //     { email: user.email },
                //     { isLogin: true },
                //     { new: true, select: "-__v -Password" }
                // );

                const id = user._id;
                const token = generateToken(id, secret_key);
                console.log('Generated Token:', token);

                const updatedUser = await userModel.findOneAndUpdate(
                    { email: user.email, isDelete: false },
                    { isLogin: true, token: token },
                    { new: true, select: "-__v -password" }
                );
                return res.send({
                    status: true,
                    message: "login successfully",
                    subCode: 200,
                    data: updatedUser
                });
            } else {
                return res.send({
                    status: false,
                    message: 'Invalid credentials',
                    subCode: 400
                });
            }
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
