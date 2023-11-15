const ProductService = require('../services/ProductService')

const createProduct = async (req, res) => {
    try {

        // console.log(req.body);
        const {tenSanPham, donGia, soLuongConLai, size, type, hinhAnh, rating, description} = req.body
        
        console.log('req.body', req.body)
        if(!tenSanPham || !donGia || !soLuongConLai || !size || !type || !hinhAnh || !rating || !description) {
            return res.status(200).json({
                status: "ERRO",
                message: "Phải nhập tất cả thông tin!!!"
            })
        }
        const response = await ProductService.createProduct(req.body)
        return res.status(200).json(response)
    }
    catch (e){
        return res.status(404).json({
            message: e
        })
    }
}

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id
        const data = req.body
        if(!productId) {
            return res.status(200).json({
                status: "ERRO",
                message: "Lỗi id"
            })
        }
        console.log('productId', productId);

        const response = await ProductService.updateProduct(productId, data)
        return res.status(200).json(response)
    }
    catch (e){
        return res.status(404).json({
            message: e
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id
        // const token = req.headers
        // console.log('token', token)
        if(!productId) {
            return res.status(200).json({
                status: "ERRO",
                message: "Lỗi id sản phẩm"
            })
        }
        // console.log('productId', productId);

        const response = await ProductService.deleteProduct(productId)
        return res.status(200).json(response)
    }
    catch (e){
        return res.status(404).json({
            message: e
        })
    }
}

const getAllProduct = async (req, res) => {
    try {
        const { limit, page, sort, filter } = req.query
        const response = await ProductService.getAllProduct(Number(limit) || 20, Number(page) || 0, sort, filter)
        return res.status(200).json(response)
    }
    catch (e){
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailsProduct = async (req, res) => {
    try {
        const productId = req.params.id
        // const token = req.headers
        // console.log('token', token)
        if(!productId) {
            return res.status(200).json({
                status: "ERRO",
                message: "Lỗi id sản phẩm"
            })
        }
        // console.log('productId', productId);

        const response = await ProductService.getDetailsProduct(productId)
        return res.status(200).json(response)
    }
    catch (e){
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProduct
}