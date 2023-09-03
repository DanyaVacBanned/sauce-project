const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const MessageSchema = new Schema({
        sender: { type: ObjectId, ref: 'User', required: true },
        text: { type: String },
        recipient: { type: ObjectId, ref: 'User', required: false},
        timestamps: { type: Date, default: Date.now}
})




module.exports = mongoose.model('Message', MessageSchema)

