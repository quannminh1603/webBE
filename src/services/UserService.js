const User = require('../models/UserModel')
const bcrypt = require('bcrypt')
const { genneralAccessToken, genneralRefreshToken } = require('./JwtService')

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const {hoTenKH, username, password, confirmPassword, email, diaChi, sdt, role} = newUser
        try {
            const checkUser = await User.findOne({
                username: username
            })
            if (checkUser !== null) {
                resolve({
                    status: "ERR",
                    message: "Tên đăng nhập đã tồn tại!!!"
                })
            }
            const checkEmail = await User.findOne({
                email: email
            })
            if (checkEmail !== null) {
                resolve({
                    status: "ERR",
                    message: "Địa chỉ email đã tồn tại!!!"
                })
            }
            const hash = bcrypt.hashSync(password, 10)
            const createdUser = await User.create({
                hoTenKH,
                username,
                password: hash,
                confirmPassword: hash,
                email,
                diaChi,
                sdt,
                role
            })
            if (createdUser) {
                resolve({
                    status: "OK",
                    message: "SUCCESS",
                    data: createdUser
                })
            }
            
        }
        catch (e) {
            reject(e);
        }
    })
}

const loginUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const {username, password} = userLogin
        try {
            const checkUser = await User.findOne({
                username: username
            })
            if (checkUser === null) {
                resolve({
                    status: "ERR",
                    message: "Tên đăng nhập không tồn tại!!!"
                })
            }
            // console.log("comparePassword", comparePassword);
            const comparePassword = bcrypt.compareSync(password, checkUser.password)
            if (!comparePassword) {
                resolve({
                    status: "ERR",
                    message: "Tài khoản hoặc mật khẩu không chính xác!!!"
                })
            }
            const access_token = await genneralAccessToken({
                id: checkUser.id,
                role: checkUser.role
            })

            const refresh_token = await genneralRefreshToken({
                id: checkUser.id,
                role: checkUser.role
            })

            // console.log('access_token', access_token)
            resolve({
                status: "OK",
                message: "SUCCESS",
                access_token,
                refresh_token
            })
           
            
        }
        catch (e) {
            reject(e);
        }
    })
}

const updateUser = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id
            })
        //    console.log('checkUser', checkUser)
           if(!checkUser) {
                resolve({
                    status: "OK",
                    message: "ID không tồn tại!!!"
                })
           }
            const updatedUser = await User.findByIdAndUpdate(id, data, {new: true})
            console.log('updatedUser', updatedUser)
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: updatedUser
            })
        }


        catch (e) {
            reject(e);
        }
    })
}

const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id
            })
        //    console.log('checkUser', checkUser)
           if(checkUser === null) {
                resolve({
                    status: "OK",
                    message: "ID không tồn tại!!!"
                })
           }
            await User.findByIdAndDelete(id)
            resolve({
                status: "OK",
                message: "DELETE USER SUCCESS",
            })
        }


        catch (e) {
            reject(e);
        }
    })
}

const getAllUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const allUser = await User.find()
            resolve({
                status: "OK",
                message: "LẤY THÀNH CÔNG DANH SÁCH USER",
                data: allUser
            })
        }


        catch (e) {
            reject(e);
        }
    })
}

const getDetailsUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
                _id: id
            })
        //    console.log('user', user)
           if(user === null) {
                resolve({
                    status: "OK",
                    message: "ID không tồn tại!!!"
                })
           }
            resolve({
                status: "OK",
                message: "Success",
                data: user
            })
        }


        catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser
}