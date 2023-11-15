const UserService = require('../services/UserService')
const JwtService = require('../services/JwtService')

const createUser = async (req, res) => {
    try {

        // console.log(req.body);
        const {hoTenKH, username, sdt, email, diaChi, password, confirmPassword, role} = req.body
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmail = reg.test(email)
        if(!hoTenKH || !username || !sdt || !email || !diaChi || !password || !confirmPassword) {
            return res.status(200).json({
                status: "ERR",
                message: "Phải nhập tất cả thông tin!!!"
            })
        }
        else if (!isCheckEmail) {
            return res.status(200).json({
                status: "ERR",
                message: "Định dạng địa chỉ email không chính xác!!!"
            })
        }
        else if (password != confirmPassword) {
            return res.status(200).json({
                status: "ERR",
                message: "Mật khẩu không khớp nhau, vui lòng nhập lại!!!"
            })
        }
        // console.log('isCheckEmail', isCheckEmail)
        const response = await UserService.createUser(req.body)
        return res.status(200).json(response)
    }
    catch (e){
        return res.status(404).json({
            message: e
        })
    }
}

const loginUser = async (req, res) => {
    try {

        // console.log(req.body);
        const {username, password} = req.body
        // const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        // const isCheckEmail = reg.test(email)
        console.log(username, password)
        if(!username || !password) {
            return res.status(200).json({
                status: "ERR",
                message: "Phải nhập tất cả thông tin!!!"
            })
        }
        // else if (!isCheckEmail) {
        //     return res.status(200).json({
        //         status: "ERR",
        //         message: "Định dạng địa chỉ email không chính xác!!!"
        //     })
        // }
        // else if (password != confirmPassword) {
        //     return res.status(200).json({
        //         status: "ERR",
        //         message: "Mật không khớp nhau, vui lòng nhập lại!!!"
        //     })
        // }
        // console.log('isCheckEmail', isCheckEmail)
        const response = await UserService.loginUser(req.body)
        console.log('response', response)
        const { refresh_token, ...newResponse } = response
        res.cookie('refresh_token', refresh_token, {
            HttpOnly: true,
            Secure: true
        })
        return res.status(200).json(newResponse)
        
    }
    catch (e){
        return res.status(404).json({
            message: e
        })
    }
}

const updateUser = async (req, res) => {
    try {
        // const userId = req.params.id
        // const data = req.query.body
        // if(!userId) {
        //     return res.status(200).json({
        //         status: "ERR",
        //         message: "Lỗi id!!!"
        //     })
        // }
        // console.log('userId', userId);
        
        // const response = await UserService.updateUser(userId, data)
        // return res.status(200).json(response)
        const userId = req.params.id
        const data = req.body
        if(!userId) {
            return res.status(200).json({
                status: "ERR",
                message: "Lỗi id"
            })
        }
        console.log('userId', userId);

        const response = await UserService.updateUser(userId, data)
        return res.status(200).json(response)
    }
    catch (e){
        return res.status(404).json({
            message: e
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id
        // const token = req.headers
        // console.log('token', token)
        if(!userId) {
            return res.status(200).json({
                status: "ERR",
                message: "Lỗi id"
            })
        }
        // console.log('userId', userId);

        const response = await UserService.deleteUser(userId)
        return res.status(200).json(response)
    }
    catch (e){
        return res.status(404).json({
            message: e
        })
    }
}

const getAllUser = async (req, res) => {
    try {
        const response = await UserService.getAllUser()
        return res.status(200).json(response)
    }
    catch (e){
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailsUser = async (req, res) => {
    try {
        const userId = req.params.id
        // const token = req.headers
        // console.log('token', token)
        if(!userId) {
            return res.status(200).json({
                status: "ERR",
                message: "Lỗi id"
            })
        }
        // console.log('userId', userId);

        const response = await UserService.getDetailsUser(userId)
        return res.status(200).json(response)
    }
    catch (e){
        return res.status(404).json({
            message: e
        })
    }
}

const refreshToken = async (req, res) => {
    // console.log('req.cookie', req.cookies);
    try {
        const token = req.cookies.refresh_token
        // const token = req.headers
        // console.log('token', token)
        if(!token) {
            return res.status(200).json({
                status: "ERR",
                message: "Token is required"
            })
        }
        // console.log('userId', userId);

        const response = await JwtService.refreshTokenJwtService(token)
        return res.status(200).json(response)
    }
    catch (e){
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
    refreshToken
}