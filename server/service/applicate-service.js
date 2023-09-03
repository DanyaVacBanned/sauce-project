const ApplicateModel = require('../models/applicate-model')
const UserModel = require('../models/user-model')


class ApplicateService {

    async checkSpec(id){
        const user = await UserModel.findById(id)
        if(user.role == 1){
            return true
        }
        
    }
    async checkRab(id){
        const user = await UserModel.findById(id)
        if(user.role == 2){
            return true
        }
        
    }
    async filterSpecApp(id, city){
        const user = await UserModel.findById(id)
        if(user.role == 1){
            if(user.city == city){
                return true
            }
        }
    }
    async filterRabApp(id, city){
        const user = await UserModel.findById(id)
        if(user.role == 2){
            if(user.city == city){
                return true
            }
        }
    }
    async filterSpecAppS(id, spec){
        const user = await UserModel.findById(id)
        if(user.role == 1){
            const users = await UserModel.find({specional: { $in: spec }})
            return users
        }
    }
    async filterRabAppS(spec, idx){
        
        let post = []
            for(let i = 0; i < idx.length; i++){
                
            }
            const users = await UserModel.find({specional: { $in: spec }}, { _id: id }, { role: 2 })
            for(let i = 0; i < users.length; i++){
                 post.push(await ApplicateModel.findById(users[i]._id))
            }
            
            
            return post
        
    }

}



module.exports = new ApplicateService()

