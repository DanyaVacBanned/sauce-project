
const bcrypt = require('bcrypt')
const uuid = require('uuid')

const UserModel = require('../models/user-model')
const mailService = require('./mail-service')
const tokenService = require('./token-service')
const UserDto = require('../dtos/user-dto')
const ApiError = require('../exceptions/api-error') 
const ApplicateModel = require('../models/applicate-model')
const FastApplicateModel = require('../models/fastapp-model')

class UserService {
    
    async registration(role, email, password, fullName, city, cityzship, specional, addressObject){


        const hashPassword = await bcrypt.hash(password, 4)

        const activateLink = uuid.v4()

        const user = await UserModel.create({ 
                                            role,
                                            fullName, 
                                            city, 
                                            cityzship, 
                                            specional, 
                                            addressObject, 
                                            email, 
                                            password: hashPassword, 
                                            activateLink })

        // await mailService.sendActivationMail( email, `${process.env.API_URL}/api/activate/${activateLink}`)

        const userDto = new UserDto(user)
        const tokens = tokenService.generationTokens({ ...userDto})

        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return { ...tokens, user: userDto, }
    }
    async activate(){
        const user = await UserModel.findOne({ activationLink })
        if(!user){
            throw ApiError.BadRequest('Неккоректная ссылка активации')
        }
        user.isActivated = true
        await user.save()
    }
    async login(email, password){
        const user = await UserModel.findOne({ email })
        if(!user){
            throw ApiError.BadRequest('Пользователь не найден')
        }
        const isPassEquals = await bcrypt.compare(password, user.password)
        if(!isPassEquals){
            throw ApiError.BadRequest('Неверный пароль')
        }
        const userDto = new UserDto(user)
        const tokens = tokenService.generationTokens({ ...userDto})
        await tokenService.saveToken(UserDto.id, tokens.refreshToken)
        return {...tokens, userDto}
    }
    async logout(refreshToken){
        const token = await tokenService.removeToken(refreshToken)
        return token
    }
    async refresh(refreshToken){
        if(!refreshToken){
            throw ApiError.UnauthorizerError()
        }
        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDB = await tokenService.findToken(refreshToken)
        if(!userData || !tokenFromDB){
            throw ApiError.UnauthorizerError()
        }
        const user = await UserModel.findById(userData.id)
        const userDto = new UserDto(user)
        const tokens = tokenService.generationTokens({ ...userDto})
        await tokenService.saveToken(UserDto.id, tokens.refreshToken)
        return {...tokens, userDto}
    }
    async getAllUsers(){
        const users = await UserModel.find()
        return users
    }
    async filterCity(city){
        try{
            const users = await UserModel.find({city: { $eq: city }})
            return users
        }catch(err){
            console.log(err)
            res.status(500).json({
                message: 'Фильтры не работают'
            })
        }
    }
    async filterSpec(spec){
        try{
            const users = await UserModel.find({specional: { $in: spec }})
            return users
        }catch(err){
            console.log(err)
            res.status(500).json({
                message: 'Фильтры не работают'
            })
        }
    }
    async filterCity(city){
        try{
            const users = await UserModel.find({city: { $eq: city }})
            return users
        }catch(err){
            console.log(err)
            res.status(500).json({
                message: 'Фильтры не работают'
            })
        }
    }
    async filterSpec(spec){
        try{
            const users = await UserModel.find({specional: { $in: spec }})
            return users
        }catch(err){
            console.log(err)
            res.status(500).json({
                message: 'Фильтры не работают'
            })
        }
    }
    async addZ(id){
        try{
            
            const app = await ApplicateModel.findOne({
                _id: id
            })
            return app

        }catch(err){
            console.log(err)
            res.status(500).json({
                message: 'Не удалось добавить в закладки'
            })
        }
    }
    async addFastZ(id){
        try{
            
            const app = FastApplicateModel.findOne({
                _id: id
            })
            return app

        }catch(err){
            console.log(err)
            res.status(500).json({
                message: 'Не удалось добавить в закладки'
            })
        }
    }
    async remZ(id){
        try{
            
            const app = ApplicateModel.findOne({
                _id: id
            })
            return app
        }catch(err){
            console.log(err)
            res.status(500).json({
                message: 'Не удалось убрать из закладок'
            })
        }
    }
    async remFastZ(id){
        try{
            
            const app = FastApplicateModel.findOne({
                _id: id
            })
            return app
        }catch(err){
            console.log(err)
            res.status(500).json({
                message: 'Не удалось убрать из закладок'
            })
        }
    }
    async addUserZ(id){
        try{
            
            const user = UserModel.findOne({
                _id: id
            })
            return user
        }catch(err){
            console.log(err)
            res.status(500).json({
                message: 'Не удалось убрать из закладок'
            })
        }
    }
    async remUserZ(id){
        try{
            
            const user = UserModel.findOne({
                _id: id
            })
            return user
        }catch(err){
            console.log(err)
            res.status(500).json({
                message: 'Не удалось убрать из закладок'
            })
        }
    }
    // async getAllZ(){

    //         return bookmarked

    //     // await UserModel.find().project({'bookmarks': 1}).toArray((err, res) => {
    //     //     const bookmarked = res[0].bookmarks
    //     //     res.json(bookmarked)
    //     // })
        
        
    // }
}







module.exports = new UserService()