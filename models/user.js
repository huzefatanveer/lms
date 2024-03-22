const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
   
});

userSchema.methods.comparePassword = async function (password) {
    try {
        let pass = this.password;
        let check = await bcrypt.compare(password, pass);
        return check;
    } catch (error) {
        console.log(error);
    }
};

userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model('user', userSchema);
