const { roleModel } = require('../../model/role.model')

exports.addRole = async (req, res) => {
    try {
        if (req.body.roleName === "") {
            return res.send({ status: false, subCode: 400, message: "Role name is required" })
        }
        if (req.body.userId === "") {
            return res.send({ status: false, subCode: 400, message: "userId is required" })
        }
        const roleData = await roleModel.findOne({ roleName: req.body.roleName });
        // console.log(role);        
        if (!roleData) {
        const saveData = new roleModel(req.body)
        await saveData.save()
           return  res.send({ status: true, message: "Role added successfully", subCode: 200 ,data:saveData})
        } else {
          return  res.send({ status: false, subCode: 400, message: "Role already exist" })
        }
    } catch (error) {
        console.log("HelperError:",error);
        return res.send({ status:false, message:error.message,subCode:400})
    }
}

exports.removeRole = async (req, res) => {
    try {
        const id = req.params._id
        const data = await roleModel.findOneAndUpdate(
            { _id: id, isDelete: false },
            { isActive: false, isDelete: true },
            { new: true }
        );
        if (data)
            return res.send({ status: true, subCode: 200, message: "role Deleted successfully ", data: data })
        else
            return res.send({ status: false, subCode: 400, message: "data not found ", data: data })
    } catch (error) {
        console.log("Helper Err:", error);
        return res.send({ status: false, subCode: 400, message: error.message })
    }
}

exports.searchRole = async (req, res) => {
    try {
        const data = await roleModel.find({ roleName: { $regex: req.body.roleName, $options: 'i' }, isDelete: false });
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

exports.activeRole = async (req, res) => {
    try {
        const id = req.params._id
        const data = await roleModel.findOne({ _id: id, isDelete: false });
        if (data) {
            data.isActive = !data.isActive; // Toggle isActive value
            await data.save();
            if (data.isActive) {
                return res.send({ status: true, subCode: 200, message: "role activated successfully", data: data });
            } else {
                return res.send({ status: true, subCode: 200, message: "role deactivated successfully", data: data });
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

exports.editRole = async (req, res) => {
    try {
        const id = req.body.id
        const { ...newData } = req.body
        const data = await roleModel.findOneAndUpdate(
            { _id: id, isDelete: false },
            newData
            , { new: true }
        );
        if (!data) {
            return res.send({ status: false, subCode: 400, message: "data not exist" })
        }
        if (data.isDelete === true) {
            // Course with the given id not found
            return res.send({ status: false, subCode: 404, message: "role not found.", data: null });
        }
        return res.send({ status: true, subCode: 200, message: "role updated successfully ", data: data })
    } catch (error) {
        console.log("Helper Err:", error);
        return res.send({ status: false, subCode: 400, message: error.message })
    }
}

exports.getOneRole = async (req, res) => {
    try {
        const id = req.params._id
        const data = await roleModel.findOne({ _id: id, isDelete: false })
        // console.log(data);
        if (!data) {
            return res.send({ status: false, subCode: 400, message: "data not exist" })
        }
        if (data.isActive === true) {
            return res.send({ status: true, subCode: 200, message: "role get successfully ", data: data })
        } else {
            return res.send({ status: false, subCode: 400, message: "data not exist" })
        }
    } catch (error) {
        console.log("Helper Err:", error);
        return res.send({ status: false, subCode: 400, message: error.message })
    }
}

exports.getAllRole = async (req, res) => {
    try {
        // Find all categories, excluding the '__v' and 'isActive' fields
        const role = await roleModel.find({ isDelete: false });
        // Filter the user based on isActive and isDelete conditions
        const adminData = [];
        const usersData = [];
        role.forEach(role => {
            if (role.isActive === true && role.isDelete === false) {
                adminData.push(role);
                usersData.push(role);
            } else if (role.isActive === false && role.isDelete === false) {
                adminData.push(role);
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

exports.paginationRole = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = 10;
        const totalRoles = await roleModel.countDocuments();
        // console.log(totalRoles)
        const totalPages = Math.ceil(totalRoles / perPage);
        const roles = await roleModel.find({ isDelete: false })
            .skip((page - 1) * perPage)
            .limit(perPage);
        return res.send({ status: true, subCode: 200, message: "Pagination done successfully.", data: { totalPages, page, roles } })
    } catch (error) {
        console.error("Helper Err:", error);
        return res.send({ status: false, subCode: 400, message: error.message });
    }
}