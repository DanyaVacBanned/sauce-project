
const ApplicateModel = require('../models/applicate-model')
const FastApplicateModel = require('../models/fastapp-model')
const UserModel = require('../models/user-model')
const ApplicateService = require('../service/applicate-service')

class ApplicateController {
    async create(req, res, next){
        try{  
            const doc = new ApplicateModel({
                title: req.body.title,
                text: req.body.text,
                user: req.userId
            })
            const app = await doc.save()

            res.json(app)
        }catch(err){
            console.log(err)
            res.status(404).json({
                message: 'Статья не создана'
            })
        }
    }
    async getOne(req, res, next){
        try{
            const appId = req.params.id

            ApplicateModel.findOneAndUpdate(
                {
                    _id: appId
                },
                {
                    $inc: { viewsCount: 1 }
                },
                {
                    returnDocument: 'after'
                },
            ).then((data, err) => {
                if(err){
                    console.log(err)
                    return res.status(500).json({
                        message: 'Не удалось вернуть статью'
                    })
                }
                if(!data){
                    return res.status(404).json({
                        message: 'Не удалось найти статью'
                    })
                }
                res.json(data)
            })
        }catch(err){
            console.log(err)
            res.status(500).json({
                message: 'Ошибка на сервере'
            })
        }
    }
    async getAll(req, res, next){
        try{
            const apps = await ApplicateModel.find()
            res.json(apps)
        }catch(err){
            console.log(err)
            res.status(500).json({
                message: 'Не удалось получить список заявок'
            })
        }
    }
    async remove(req, res, next){
        try{
            const appId = req.params.id
            await ApplicateModel.findOneAndDelete({
                _id: appId
            }).then((data, err) => {
                if(err){
                    console.log(err)
                    return res.status(500).json({
                        message: 'Не удалось удалить заявку'
                    })
                }
                if(!data){
                    return res.status(404).json({
                        message: 'Не удалось найти заявку'
                    })
                }
                res.json({
                    success: true
                })
            })
        }catch(err){
            console.log(err)
            res.status(500).json({
                message: 'Не удалось удалить зявки'
            })
        }
    }
    async createFA(req, res, next){
        try{  
            const doc = new FastApplicateModel({
                title: req.body.title,
                text: req.body.text,
                user: req.userId
            })
            const app = await doc.save()

            res.json(app)
        }catch(err){
            console.log(err)
            res.status(404).json({
                message: 'Статья не создана'
            })
        }
    }
    async getOneFA(req, res, next){
        try{
            const appId = req.params.id

            FastApplicateModel.findOneAndUpdate(
                {
                    _id: appId
                },
                {
                    $inc: { viewsCount: 1 }
                },
                {
                    returnDocument: 'after'
                },
            ).then((data, err) => {
                if(err){
                    console.log(err)
                    return res.status(500).json({
                        message: 'Не удалось вернуть статью'
                    })
                }
                if(!data){
                    return res.status(404).json({
                        message: 'Не удалось найти статью'
                    })
                }
                res.json(data)
            })
        }catch(err){
            console.log(err)
            res.status(500).json({
                message: 'Ошибка на сервере'
            })
        }
    }
    async getAllFA(req, res, next){
        try{
            const fastapps = await FastApplicateModel.find()
            res.json(fastapps)
        }catch(err){
            console.log(err)
            res.status(500).json({
                message: 'Не удалось получить список заявок'
            })
        }
    }
    async removeFA(req, res, next){
        try{
            const appId = req.params.id
            await FastApplicateModel.findOneAndDelete(
                {
                _id: appId
            }).then((data, err) => {
                if(err){
                    console.log(err)
                    return res.status(500).json({
                        message: 'Не удалось удалить заявку'
                    })
                }
                if(!data){
                    return res.status(404).json({
                        message: 'Не удалось найти заявку'
                    })
                }
                res.json({
                    success: true
                })
            })
        }catch(err){
            console.log(err)
            res.status(500).json({
                message: 'Не удалось удалить зявки'
            })
        }
    }
    async getAllSpec(req, res, next){
        try{
            let postSpec = []
            const posts = await ApplicateModel.find()
            
            for(let i = 0; i < posts.length; i++){
                let { user } = posts[i]
                let checker = await ApplicateService.checkSpec(user)
                
                if(checker == true){
                    
                    postSpec.push(posts[i])
                }
            }
            
            res.json({postSpec})
        }catch(err){
            console.log(err)
            res.status(501).json({
                message: 'Не удалось показать специалистов'
            })
        }
    }
    async getAllRab(req, res, next){
        try{
            let postSpec = []
            const posts = await ApplicateModel.find()
            
            for(let i = 0; i < posts.length; i++){
                let { user } = posts[i]
                let checker = await ApplicateService.checkRab(user)
                
                if(checker == true){
                    
                    postSpec.push(posts[i])
                }
            }
            
            res.json({postSpec})
        }catch(err){
            console.log(err)
            res.status(501).json({
                message: 'Не удалось получить все заявки работадателей'
            })
        }
    }
    async getAllFSpec(req, res, next){
        try{
            let postSpec = []
            const posts = await FastApplicateModel.find()
            
            for(let i = 0; i < posts.length; i++){
                let { user } = posts[i]
                let checker = await ApplicateService.checkSpec(user)
                
                if(checker == true){
                    
                    postSpec.push(posts[i])
                }
            }
            
            res.json({postSpec})
        }catch(err){
            console.log(err)
            res.status(501).json({
                message: 'Не удалось получить быстрые заявки специалистов'
            })
        }
    }
    async getAllFRab(req, res, next){
        try{
            let postSpec = []
            const posts = await ApplicateModel.find()
            
            for(let i = 0; i < posts.length; i++){
                let { user } = posts[i]
                let checker = await ApplicateService.checkRab(user)
                
                if(checker == true){
                    
                    postSpec.push(posts[i])
                }
            }
            
            res.json({postSpec})
        }catch(err){
            console.log(err)
            res.status(501).json({
                message: 'Не удалось получить быстрые заявки работодателей'
            })
        }
    }
    async filterCityAppSpec(req, res, next){
        try{
            let postSpec = []
            const posts = await ApplicateModel.find()
            const city = req.body.city
            for(let i = 0; i < posts.length; i++){
                let { user } = posts[i]
                let checker = await ApplicateService.filterSpecApp(user, city)
                
                if(checker == true){
                    
                    postSpec.push(posts[i])
                }
            }
            
            res.json({postSpec})
        }catch(err){
            console.log(err)
            res.status(501).json({
                message: 'Не удалось показать специалистов'
            })
        }
    }
    async filterCityAppRab(req, res, next){
        try{
            let postSpec = []
            const posts = await ApplicateModel.find()
            const city = req.body.city
            for(let i = 0; i < posts.length; i++){
                let { user } = posts[i]
                let checker = await ApplicateService.filterRabApp(user, city)
                
                if(checker == true){
                    
                    postSpec.push(posts[i])
                }
            }
            
            res.json({postSpec})
        }catch(err){
            console.log(err)
            res.status(501).json({
                message: 'Не удалось показать специалистов'
            })
        }
    }
    async filterSpecAppSpec(req, res, next){
        try{
            let postSpec = []
            const posts = await ApplicateModel.find()
            const spec = req.body.specional
            for(let i = 0; i < posts.length; i++){
                let { user } = posts[i]
                let checker = await ApplicateService.filterSpecAppS(user, spec)
                
                if(checker == true){
                    
                    postSpec.push(posts[i])
                }
            }
            
            res.json({postSpec})
        }catch(err){
            console.log(err)
            res.status(501).json({
                message: 'Не удалось показать специалистов'
            })
        }
    }
    async filterSpecAppRab(req, res, next){
        try{
            let idx = []
            const posts = await ApplicateModel.find()
            for(let i = 0; i < posts.length; i++){
                idx.push(posts[i].user)
            }
            
            const spec = req.body.specional
            let checker = await ApplicateService.filterRabAppS(spec, idx)
            res.json({idx})
        }catch(err){
            console.log(err)
            res.status(501).json({
                message: 'Не удалось показать специалистов'
            })
        }
    }
    async filterCityFAppSpec(req, res, next){
        try{
            let postSpec = []
            const posts = await FastApplicateModel.find()
            const city = req.body.city
            for(let i = 0; i < posts.length; i++){
                let { user } = posts[i]
                let checker = await ApplicateService.filterSpecApp(user, city)
                
                if(checker == true){
                    
                    postSpec.push(posts[i])
                }
            }
            
            res.json({postSpec})
        }catch(err){
            console.log(err)
            res.status(501).json({
                message: 'Не удалось показать специалистов'
            })
        }
    }
    async filterSpecFAppSpec(req, res, next){

    }
    async filterCityFAppRab(req, res, next){
        try{
            let postSpec = []
            const posts = await FastApplicateModel.find()
            
            for(let i = 0; i < posts.length; i++){
                let { user } = posts[i]
                let checker = await ApplicateService.filterRabApp(user)
                
                if(checker == true){
                    
                    postSpec.push(posts[i])
                }
            }
            
            res.json({postSpec})
        }catch(err){
            console.log(err)
            res.status(501).json({
                message: 'Не удалось показать специалистов'
            })
        }
    }
    async filterSpecFAppRab(req, res, next){

    }

}


module.exports = new ApplicateController()