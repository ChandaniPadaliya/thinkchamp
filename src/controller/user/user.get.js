const { userModel } = require("../model/user.model")
const mongoDbserviceUser = require("../../services/mongoDbService")({model: user})



exports.getAllUser = async (req,res) => {
    try {
        // Find all categories, excluding the '__v' and 'isActive' fields
        const user = await mongoDbserviceUser.getDocumentByQuery({isDelete:false});
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