const timespan = require('jsonwebtoken/lib/timespan');
const mongoose = require('mongoose')
const userSchema = new mongoose.Schema(
    {
        hoTenKH: {type: String, required: true},
        username: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        confirmPassword: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        diaChi: {type: String, required: true},
        sdt: {type: Number, required: true},
        role: {type: Boolean, default: false, required: true},
        // access_token: {type: String, required: true},
        // refresh_token: {type: String, required: true}
        creactAt: {type: Date},
        updateAt: {type: Date}
    },
    {
        timespan: true
    }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
