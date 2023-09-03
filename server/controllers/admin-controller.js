

const bcrypt = require('bcrypt')
const uuid = require('uuid')

const userService = require('../service/users-service')
const tokenService = require('../service/token-service')
const UserDto = require('../dtos/user-dto')
const ApiError = require('../exceptions/api-error') 
const UserModel = require('../models/user-model')
const PostModel = require('../models/post-model')
const AdminPostSchema = require('../models/adminpost-model')

class AdminController {
    async loginAdmin(req, res, next){
        try{
            const { email, password } = req.body
            if(req.body.email === 'admin112' && req.body.password === 'admin_3322_01ADminUwPOo2s8osmnf83'){
                const { email, password } = req.body
                const userData = await userService.login(email, password)
                res.cookie('refreshToken', userData.refreshToken, { maxAge: 90 * 24 * 60 * 60 * 1000 , httpOnly: true })
                return res.json(userData)
            }else if(req.body.email === 'admin112' && req.body.password === 'admin_3322_01ADminUwPOo2s8osmnf83'){
                const hashPassword = await bcrypt.hash(password, 4)
                const user = await UserModel.create({ 
                    role: 3,
                    fullName: 'admin', 
                    city: 'Novosibirsk', 
                    email, 
                    password: hashPassword, 
                    })
                const userDto = new UserDto(user)
                const tokens = tokenService.generationTokens({ ...userDto})
                await tokenService.saveToken(userDto.id, tokens.refreshToken)
                res.json(user, tokens) 
            }else{
                res.json({
                    message: 'Не админ'
                })
            }
            
            

        }catch(err){
            next(err)
        }
    }
    async createPost(req, res, next){
        try{
            
                const doc = new AdminPostSchema({
                    title: req.body.title,
                    text: req.body.text,
                    user: req.userId
                })
                const post = await doc.save()
                res.json(post)


        }catch(err){
            console.log(err)
            res.status(501).json({
                message: 'Не удалось создать статью'
            })
        }
    }
    async updatePost(req, res, next){
        try{
            const postId = req.params.id
            
            await AdminPostSchema.findOneAndUpdate(
                {
                    _id: postId
                },
                {
                    title: req.body.title,
                    text: req.body.text,
                    user: req.userId
                })
            res.json({
                success: true
            })
        }catch(err){
            console.log(err)
            res.status(501).json({
                message: 'Не удалось обновить статью'
            })
        }
    }
    async deletePost(req, res, next){
        try{
            const postId = req.params.id
                AdminPostSchema.findOneAndDelete(
                {
                    _id: postId
                }
                ).then((data, err) => {
                    if(err){
                        console.log(err)
                        return res.status(500).json({
                            message: 'Не удалось удалить статью'
                        })
                    }
                    if(!data){
                        return res.status(404).josn({
                            message: 'Статья не найдена'
                        })
                    }
                    res.json({
                        success: true
                    })
                })
            
        }catch(err){
            console.log(err)
            res.status(501).json({
                message: 'Не удалось удалить статью'
            })
        }
    }
    async getAllPost(req, res, next){
        try{
            const posts = await AdminPostSchema.find()
                                         .populate('user')
                                         .exec()
            res.json(posts)
        }catch(err){
            console.log(err)
            res.status(501).json({
                message: 'Не получить все статьи'
            })
        }
    }
}


module.exports = new AdminController()