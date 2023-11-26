const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema(
    {
        content: {type: String, required: true},
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
        product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
        createAt: {type: Date},
        updateAt: {type: Date}
        // reply: [
        //     {
        //
        //     }
    });

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;