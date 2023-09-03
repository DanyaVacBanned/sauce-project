const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const PostSchema = new Schema({
    title: {type: String, required: true},
    text: {type: String, required: true},
    viewsCount: {type: Number, default: 0},
  
    comments: [{
        userId: {type: ObjectId, ref: 'User'},
        comment: {type: String, required: false}
    }],
    
    user: {type: ObjectId, required: true, ref: 'User'},
},
{
    timestamps: true
})




module.exports = mongoose.model('Post', PostSchema)

