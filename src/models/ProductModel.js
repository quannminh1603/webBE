const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {
        tenSanPham: {type: String, required: true},
        donGia: {type: Number, required: true},
        soLuongConLai: {type: Number, required: true},
        size: {type: Number, required: true},
        type: {type: String, required: true},
        hinhAnh: {type: String, required: true},
        rating: {type: Number, required: true},
        description: {type: String, required: true},
        discount: { type: Number },
        mount: { type: Number },
        selled: { type: Number }
    },
    {
        timestamps: true
    }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
