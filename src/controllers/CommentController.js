const CommentService = require('../services/CommentService');

const createComment = async (req, res) => {
    console.log('req.body', req.body)
    try {
        const {content, user, product} = req.body;
        if (!content || !user || !product) {
            return res.status(200).json({
                status: "ERRO",
                message: "Phải nhập tất cả thông tin!!!"
            });
        }
        const response = await CommentService.createComment(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
}

const updateComment = async (req, res) => {
    try {
        const commentId = req.params.id;
        const data = req.body;
        if (!commentId) {
            return res.status(200).json({
                status: "ERRO",
                message: "Lỗi id"
            });
        }
        const response = await CommentService.updateComment(commentId, data);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
}

const deleteComment = async (req, res) => {
    try {
        const commentId = req.params.id;
        if (!commentId) {
            return res.status(200).json({
                status: "ERRO",
                message: "Lỗi id comment"
            });
        }
        const response = await CommentService.deleteComment(commentId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
}

const getCommentByProductId = async (req, res) => {
    try {
        const productId = req.params.id;
        if (!productId) {
            return res.status(200).json({
                status: "ERRO",
                message: "Lỗi id comment"
            });
        }
        const response = await CommentService.getCommentByProductId(productId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
}

module.exports = {
    createComment,
    updateComment,
    deleteComment,
    getCommentByProductId
}