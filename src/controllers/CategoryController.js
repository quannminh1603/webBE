const CategoryService = require('../services/CategoryService');

const createCategory = async (req, res) => {
    console.log('req.body', req.body)
    try {
        const {ten, description} = req.body;
        if (!ten || !description) {
            return res.status(200).json({
                status: "ERRO",
                message: "Phải nhập tất cả thông tin!!!"
            });
        }
        const response = await CategoryService.createCategory(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
}

const updateCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const data = req.body;
        if (!categoryId) {
            return res.status(200).json({
                status: "ERRO",
                message: "Lỗi id"
            });
        }
        const response = await CategoryService.updateCategory(categoryId, data);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
}

const deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        if (!categoryId) {
            return res.status(200).json({
                status: "ERRO",
                message: "Lỗi id danh mục"
            });
        }
        const response = await CategoryService.deleteCategory(categoryId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
}

const getAllCategory = async (req, res) => {
    try {
        const response = await CategoryService.getAllCategory();
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
}

const getCategoryById = async (req, res) => {
    try {
        const categoryId = req.params.id;
        if (!categoryId) {
            return res.status(200).json({
                status: "ERRO",
                message: "Lỗi id danh mục"
            });
        }
        const response = await CategoryService.getCategoryById(categoryId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
}

module.exports = {
    createCategory,
    updateCategory,
    deleteCategory,
    getAllCategory,
    getCategoryById
}