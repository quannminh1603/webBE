const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
    {
        orderItems: [
            {
                name: {type: String, required: true},
                soLuongMua: {type: Number, required: true},
                hinhAnh: {type: String, required: true},
                donGia: {type: Number, required: true},
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },
            },
        ],
        shippingAddress: {
            hoTenKH: {type: String, required: true},
            diaChi: {type: String, required: true},
            phone: {type: Number, required: true},
            email: {type: String, required: true},
        },
        paymentMethod: {type: String, required: true},
        donGia: {type: Number, required: true},
        shippingPrice: {type: Number, required: true},
        sizePrice: {type: Number, required: true},
        totalPrice: {type: Number, required: true},
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
        isPaid: {type: Boolean, default: false},
        paidAt: {type: Date},
        isDelivered: {type: Boolean, default: false},
        deliveredAt: {type: Date},
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;