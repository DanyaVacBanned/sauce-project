const { Schema, model } = require('mongoose')


const UserSchema = new Schema({
    role: {type: Number, required: false},

    fullName: {type: String, required: true},
    city: {type: String, required: false},
    email: { type: String, required: true},
    password: { type: String, required: true},

    cityzship: {type: String, required: false},
    specional: {type: Array, required: false},

    addressObject: {type: String, required: false},

    isActivated: { type: Boolean, default: false},
    activationLink: { type: String },

    phone: { type: String },

    allObject: {type: Array },

    stage: { type: String },

    infoText: { type: String },


    imageUrl: { type: String },

    bookmarksApp: { type: Array },
    bookmarksFastApp: { type: Array },
    bookmarksUser: { type: Array },

    roomId: { type: Array }
})




module.exports = model('User', UserSchema)


