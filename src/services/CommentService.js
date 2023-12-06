const Comment = require('../models/CommentModel');

const createComment = (newComment) => {
    return new Promise(async (resolve, reject) => {
        const {content, user, product} = newComment;
        try {
            const newComment = await Comment.create({
                content,
                user,
                product
            });
            if (newComment) {
                resolve({
                    status: "OK",
                    message: "Comment Success",
                    data: newComment
                });
            }

        }
        catch (e) {
            reject(e);
        }
    });
}

const updateComment = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkComment = await Comment.findOne({
                _id: id
            });
            //    console.log('checkComment', checkComment)
            if (!checkComment) {
                resolve({
                    status: "OK",
                    message: "ID comment không tồn tại!!!"
                });
            }
            const updateComment = await Comment.findByIdAndUpdate(id, data, {new: true});
            console.log('updateComment', updateComment);
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: updateComment
            });
        }
        catch (e) {
            reject(e);
        }
    });
}

const deleteComment = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkComment = await Comment.findOne({
                _id: id
            });
            //    console.log('checkComment', checkComment)
            if (checkComment === null) {
                resolve({
                    status: "OK",
                    message: "ID comment không tồn tại!!!"
                });
            }
            await Comment.findByIdAndDelete(id);
            resolve({
                status: "OK",
                message: "DELETE COMMENT SUCCESS",
            });
        }
        catch (e) {
            reject(e);
        }
    });
}

const getCommentByProductId = (productId) => {
    return new Promise(async (resolve, reject) => {
        // sắp xếp theo thứ tự giảm dần của createdAt
        try {
            const comments = await Comment
                .find({product: productId})
                .populate('user','name')
                //sort by createdAt descending
                .sort({createdAt: -1});
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: comments
            });
        }catch (e) {
            reject(e);
        }
    });
}

module.exports = {
    createComment,
    updateComment,
    deleteComment,
    getCommentByProductId
}

