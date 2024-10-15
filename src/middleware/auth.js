const jwt = require('jsonwebtoken')
require('dotenv').config();

// const secret_key = process.env.TOKEN_KEY
const secret_key="mysecretkey"

exports.parseJwt = (data) => {
    try {

        let token = data.split(" ")[1];
        // console.log(token);
        return token
    } catch (e) {
        return null;
    }
}

exports.generateToken = (userId) => {
    const token = jwt.sign({ userId: userId }, secret_key)
    return token
}

exports.verifyToken = (req, res) => {
    let token;
    const { authorization } = req.headers;
    if (authorization && authorization.startsWith('Bearer')) {
        try {
            token = authorization.split(" ")[1]
            console.log(token);
            let decoded = jwt.verify(token, secret_key);
            userId = decoded.userId
            console.log(userId);
            return res.send(userId)
        } catch (err) {
            return res.send({ status: false, message: "Invalid token." });
        }
    } else {
        return res.send({ status: false, message: "Invalid token" });
    }
}

exports.generateAdminToken = (userId) => {
    const token = jwt.sign({ userId: userId }, secret_key)
    return token
}

exports.verifyAdminToken = (req, res) => {
    let token;
    const { authorization } = req.headers;
    if (authorization && authorization.startsWith('Bearer')) {
        try {
            token = authorization.split(" ")[1]
            console.log(token);
            let decoded = jwt.verify(token, secret_key);
            userId = decoded.userId
            console.log(userId);
            return res.send(userId)
        } catch (err) {
            return res.send({ status: false, message: "Invalid token.." });
        }
    } else {
        return res.send({ status: false, message: "Invalid token" });
    }
}

exports.generateStudentToken = (userId) => {
    const token = jwt.sign({ userId: userId }, secret_key)
    return token
}

exports.verifyStudentToken = (req, res) => {
    let token;
    const { authorization } = req.headers;
    if (authorization && authorization.startsWith('Bearer')) {
        try {
            token = authorization.split(" ")[1]
            console.log(token);
            let decoded = jwt.verify(token, secret_key);
            userId = decoded.userId
            console.log(userId);
            return res.send(userId)
        } catch (err) {
            return res.send({ status: false, message: "Invalid token.." });
        }
    } else {
        return res.send({ status: false, message: "Invalid token" });
    }
}

exports.generateInstructorToken = (userId) => {
    const token = jwt.sign({ userId: userId }, secret_key)
    return token
}

exports.verifyInstructorToken = (req, res) => {
    let token;
    const { authorization } = req.headers;
    if (authorization && authorization.startsWith('Bearer')) {
        try {
            token = authorization.split(" ")[1]
            console.log(token);
            let decoded = jwt.verify(token, secret_key);
            userId = decoded.userId
            console.log(userId);
            return res.send(userId)
        } catch (err) {
            return res.send({ status: false, message: "Invalid token.." });
        }
    } else {
        return res.send({ status: false, message: "Invalid token" });
    }
}