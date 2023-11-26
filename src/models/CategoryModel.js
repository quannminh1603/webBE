const mongoose = require('mongoose')
const categorySchema = new mongoose.Schema(
    {
        ten: {type: String, required: true},
        description: {type: String, required: true},
        creactAt: {type: Date},
        updateAt: {type: Date}
    },
    {
        timestamps: true
    }
);

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;