const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const FastApplicateSchema = new Schema({
    title: {type: String, required: true},
    text: {type: String, required: true},
    viewsCount: {type: Number, default: 0},
    user: {type: ObjectId, required: true, ref: 'User'},
    expipation: { type: Date, default: Date.now, expires: '1d'}
},
{
    timestamps: true
})




module.exports = mongoose.model('FastApplicate', FastApplicateSchema)


