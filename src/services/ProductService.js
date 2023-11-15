const Product = require('../models/ProductModel')
const bcrypt = require('bcrypt')

const createProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const {tenSanPham, donGia, soLuongConLai, size, type, hinhAnh, rating, description} = newProduct
        try {
            const checkProduct = await Product.findOne({
                tenSanPham: tenSanPham
            })
            if (checkProduct !== null) {
                resolve({
                    status: "OK",
                    message: "Tên sản phẩm đã tồn tại!!!"
                })
            }
            const newProduct = await Product.create({
                tenSanPham,
                donGia,
                soLuongConLai,
                size,
                type,
                hinhAnh,
                rating,
                description
            })
            if (newProduct) {
                resolve({
                    status: "OK",
                    message: "SUCCESS",
                    data: newProduct
                })
            }
            
        }
        catch (e) {
            reject(e);
        }
    })
}

const updateProduct = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id
            })
        //    console.log('checkProduct', checkProduct)
           if(!checkProduct) {
                resolve({
                    status: "OK",
                    message: "ID sản phẩm không tồn tại!!!"
                })
           }
            const updateProduct = await Product.findByIdAndUpdate(id, data, {new: true})
            console.log('updateProduct', updateProduct)
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: updateProduct
            })
        }


        catch (e) {
            reject(e);
        }
    })
}

const deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id
            })
        //    console.log('checkProduct', checkProduct)
           if(checkProduct === null) {
                resolve({
                    status: "OK",
                    message: "ID sản phẩm không tồn tại!!!"
                })
           }
            await Product.findByIdAndDelete(id)
            resolve({
                status: "OK",
                message: "DELETE PRODUCT SUCCESS",
            })
        }


        catch (e) {
            reject(e);
        }
    })
}

const getAllProduct = (limit, page, sort, filter) => {
    console.log('sort', sort)
    console.log('filter', filter)
    return new Promise(async (resolve, reject) => {
        try {
            const totalProduct = await Product.count()
            if(filter) {
                console.log('FILTER')
                const label = filter[0];
                console.log('label', label)

                const allProductFilter = await Product.find({ [label]: { '$regex': filter[1] } }).limit(limit).skip(page * limit)
                resolve({
                    status: "OK",
                    message: "LẤY THÀNH CÔNG DANH SÁCH SẢN PHẨM",
                    data: allProductFilter,
                    total: totalProduct,
                    pageCurrent: page + 1,
                    totalPage: Math.ceil(totalProduct / limit)
                })
            }
            if(sort) {
                console.log('SORT')
                const objectSort = {}
                objectSort[sort[1]] = sort[0]
                console.log('objectSort', objectSort)
                const allProductSort = await Product.find().limit(limit).skip(page * limit).sort(objectSort)
                resolve({
                    status: "OK",
                    message: "LẤY THÀNH CÔNG DANH SÁCH SẢN PHẨM",
                    data: allProductSort,
                    total: totalProduct,
                    pageCurrent: page + 1,
                    totalPage: Math.ceil(totalProduct / limit)
                })
            }
            const allProduct = await Product.find().limit(limit).skip(page * limit)
            resolve({
                status: "OK",
                message: "LẤY THÀNH CÔNG DANH SÁCH SẢN PHẨM",
                data: allProduct,
                total: totalProduct,
                pageCurrent: page + 1,
                totalPage: Math.ceil(totalProduct / limit)
            })
        }


        catch (e) {
            reject(e);
        }
    })
}

const getDetailsProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findOne({
                _id: id
            })
        //    console.log('product', product)
           if(product === null) {
                resolve({
                    status: "OK",
                    message: "ID sản phẩm không tồn tại!!!"
                })
           }
            resolve({
                status: "OK",
                message: "Success",
                data: product
            })
        }


        catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProduct
}