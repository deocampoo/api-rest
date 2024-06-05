const mongoose = require("mongoose");


const userSchema = mongoose.Schema({

    usuario: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },
    contraseña: {
        type: String,
        required: true
    }


});

module.exports = mongoose.model('User', userSchema);