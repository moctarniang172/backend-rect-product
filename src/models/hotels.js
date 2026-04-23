const mongoose = require('mongoose');

const hotelschema = new mongoose.Schema({
    
    nom: {
        type: String,
        required: true,
        trim: true
    },

    adresse: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
       
    },

    telephone: {
        type: Number,
        required: true
    },

    prix: {
        type: Number, 
        required: true
    },

    devise: {
        type: String,
        enum: ['XOF', 'EUR', 'USD'],
        default: 'XOF'
    },

    author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
},

    images: {
        type: String,
        default: ""
    }

}, {
    timestamps: true 
});

module.exports = mongoose.model('Hotel', hotelschema);