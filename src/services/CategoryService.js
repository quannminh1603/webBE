const Category = require('../models/CategoryModel');

const createCategory = (newCategory) => {
    return new Promise(async (resolve, reject) => {
        const {ten, description} = newCategory;
        try {
            const checkCategory = await Category.findOne({
                ten: ten
            });
            if (checkCategory !== null) {
                resolve({
                    status: "OK",
                    message: "Tên danh mục đã tồn tại!!!"
                });
            }
            const newCategory = await Category.create({
                ten,
                description
            });
            if (newCategory) {
                resolve({
                    status: "OK",
                    message: "SUCCESS",
                    data: newCategory
                });
            }

        }
        catch (e) {
            reject(e);
        }
    });
}

const updateCategory = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkCategory = await Category.findOne({
                _id: id
            });
            //    console.log('checkCategory', checkCategory)
            if(!checkCategory) {
                resolve({
                    status: "OK",
                    message: "ID danh mục không tồn tại!!!"
                });
            }
            const updateCategory = await Category.findByIdAndUpdate(id, data, {new: true});
            console.log('updateCategory', updateCategory);
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: updateCategory
            });
        }
        catch (e) {
            reject(e);
        }
    });
}

const deleteCategory = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkCategory = await Category.findOne({
                _id: id
            });
            if(checkCategory === null) {
                resolve({
                    status: "OK",
                    message: "ID danh mục không tồn tại!!!"
                });
            }
            const deleteCategory = await Category.findByIdAndDelete(id);
            resolve({
                status: "OK",
                message: "Xóa thành công",
                data: deleteCategory
            });
        }
        catch (e) {
            reject(e);
        }
    });
}

const getAllCategory = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allCategory = await Category.find();
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: allCategory
            });
        }
        catch (e) {
            reject(e);
        }
    });
}

const getCategoryById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const category = await Category.findById(id);
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: category
            });
        }
        catch (e) {
            reject(e);
        }
    });
}

module.exports = {
    createCategory,
    updateCategory,
    deleteCategory,
    getAllCategory,
    getCategoryById
}