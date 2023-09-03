const { validationResult } = require('express-validator') 

const UserModel = require('../models/user-model')
const ApiError = require('../exceptions/api-error')
const userService = require('../service/users-service')
const usersService = require('../service/users-service')
const ApplicateModel = require('../models/applicate-model')
const FastApplicateModel = require('../models/fastapp-model')

class UserController {


    async registration(req, res, next){
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
            const { 
                role, 
                email, 
                password, 
                fullName, 
                city, 
                cityzship, 
                specional, 
                addressObject } = req.body

            const userData = await userService.registration(
                role, 
                email, 
                password, 
                fullName, 
                city, 
                cityzship, 
                specional, 
                addressObject)

            res.cookie('refreshToken', userData.refreshToken, { maxAge: 90 * 24 * 60 * 60 * 1000 , httpOnly: true })
            return res.json(userData)


        }catch(err){
            next(err)
        }
    }
    async login(req, res, next){
        try{
            const { email, password } = req.body
            const userData = await userService.login(email, password)
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 90 * 24 * 60 * 60 * 1000 , httpOnly: true })
            return res.json(userData)
        }catch(err){
            next(err)
        }
    }
    async logout(req, res, next){
        try{
            const { refreshToken } = req.cookies
            const token = await usersService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json(token)
        }catch(err){
            next(err)
        }
    }
    async getUsers(req, res, next){
        try{
            const users = await userService.getAllUsers()
            return res.json(users)
        }catch(err){
            next(err)
        }
    }
    async refresh(req, res, next){
        try{
            const { refreshToken } = req.cookies
            const userData = await userService.refresh(refreshToken)
            res.cookies('refreshToken', userData.refreshToken, {maxAge: 90 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(userData)
        }catch(err){
            next(err)
        }
    }
    async activate(req, res, next){
        try{
            const activateLink = req.params.link
            await userService.activate(activateLink)
            return res.redirect(procces.env.CLIENT_URL)
        }catch(err){
            next(err)
        }
    }
    async getMe(req, res, next){
        try {
         
            const user = await UserModel.findById(req.userId);
        
            if (!user) {
              return res.status(404).json({
                message: 'Пользователь не найден',
              });
            }
        
            const { hashPassword, ...userData } = user._doc;
            
        
            res.json(userData);
          } catch (err) {
            console.log(err);
            res.status(500).json({
              message: 'Нет доступа',
            });
          }
    }
    async updateUser(req, res, next){
        try{
            const userId = req.userId
            const newUser = await UserModel.updateOne(
                {
                    _id: userId
                },
                {
                    role: req.body.role, 
                    email: req.body.email,
                    password: req.body.password, 
                    fullName: req.body.fullName, 
                    city: req.body.city, 
                    cityzship: req.body.cityzship, 
                    specional: req.body.specional, 
                    addressObject: req.body.addressObject, 
                    phone: req.body.phone, 
                    allObject: req.body.allObject, 
                    infoText: req.body.infoText, 
                    stage: req.body.stage, 
                    imageUrl: req.body.imageUrl,
                    activateLink: req.body.activateLink, 
                }
            )
            const user = await UserModel.findById(userId)
            res.json(user)
        }catch(err){
            console.log(err)
            res.status(501).json({
                message: 'Не удалось обновить пользователя'
            })
        }
    }
    async addAppZ(req, res, next){
        try{
            const id = req.params.id
            const app = await userService.addZ(id)
            const userId = req.userId

            await UserModel.updateOne(
                {
                    _id: userId
                },
                {
                    $addToSet: {bookmarksApp: app._id}
                }
            )
            res.json({
                success: true
            })
        }catch(err){
            console.log(err)
            res.status(500).json({
                message: 'Не удалось добавить в закладки'
            })
        }
    }
    async remAppZ(req, res, next){
        try{
            const id = req.params.id
            const app = await userService.remZ(id)
            const userId = req.userId

            await UserModel.updateOne(
                {
                    _id: userId
                },
                {
                    $pull: {bookmarksApp: app._id}
                }
            )
            res.json({
                success: true
            })
        }catch(err){
            console.log(err)
            res.status(500).json({
                message: 'Не удалось убрать из закладок'
            })
        }
    }
    async getAllAppZ(req, res, next){
        try{
            const userId = req.userId
            const bookmarked = await UserModel.findById(
                {
                    _id: userId
                })
            
            const bm = []
            for (let i = 0; i < bookmarked.bookmarksApp.length; i++){
                const bookmarks = await ApplicateModel.findById(
                {
                    _id: bookmarked.bookmarksApp[i]
                })
                bm.push(bookmarks)
            }
            res.json(bm)

            // const userId = req.params.id
            // await UserModel.aggregate([
            //     {
            //         $match: {_id: userId}
            //     },
            //     {
            //         $lookup: {
            //             from: "Applicate",
            //             localField: "bookmarks",
            //             foreignField: "_id",
            //             as: "bookmarked"
            //         }
            //     }
            // ])
            // let bm = await UserModel.find({}, { projection: { bookmarked: 1}})
            // res.json(bm)

            // await UserModel.find({}, { projection: {'bookmarks': 1}
            // }).then((err, result) => {
            //     const bookmarked = result[0].bookmarks
            //     res.json(bookmarked)})

        }catch(err){
            console.log(err)
            res.status(500).json({
                message: 'Не удалось получить список закладок'
            })
        }
    }
    async filterCity(req, res, next){
        try{
            const city = req.body.city
            const users = await userService.filterCity(city)
            return res.json(users)
        }catch(err){
            console.log(err)
            res.status(500).json({
                message: 'Фильтры не работают'
            })
        }
    }
    async filterSpec(req, res, next){
        try{
            const spec = req.body.specional
            const users = await userService.filterSpec(spec)
            return res.json(users)
            
            
        }catch(err){
            console.log(err)
            res.status(500).json({
                message: 'Фильтры не работают'
            })
        }
    }
    async addFastAppZ(req, res, next){
        try{
            const id = req.params.id
            const app = await userService.addFastZ(id)
            const userId = req.userId

            await UserModel.updateOne(
                {
                    _id: userId
                },
                {
                    $addToSet: {bookmarksFastApp: app._id}
                }
            )
            res.json({
                success: true
            })
        }catch(err){
            console.log(err)
            res.status(500).json({
                message: 'Не удалось добавить в закладки'
            })
        }
    }
    async remFastAppZ(req, res, next){
        
            try{
                const id = req.params.id
                const app = await userService.remFastZ(id)
                const userId = req.userId
    
                await UserModel.updateOne(
                    {
                        _id: userId
                    },
                    {
                        $pull: {bookmarksFastApp: app._id}
                    }
                )
                res.json({
                    success: true
                })
            }catch(err){
                console.log(err)
                res.status(500).json({
                    message: 'Не удалось убрать из закладок'
                })
            }
    }
    async getFastAllAppZ(req, res, next){
        try{
            const userId = req.userId
            const bookmarked = await UserModel.findById(
                {
                    _id: userId
                })
            
            const bm = []
            for (let i = 0; i < bookmarked.bookmarksFastApp.length; i++){
                const bookmarks = await FastApplicateModel.findById(
                {
                    _id: bookmarked.bookmarksFastApp[i]
                })
                bm.push(bookmarks)
            }
            res.json(bm)

            // const userId = req.params.id
            // await UserModel.aggregate([
            //     {
            //         $match: {_id: userId}
            //     },
            //     {
            //         $lookup: {
            //             from: "Applicate",
            //             localField: "bookmarks",
            //             foreignField: "_id",
            //             as: "bookmarked"
            //         }
            //     }
            // ])
            // let bm = await UserModel.find({}, { projection: { bookmarked: 1}})
            // res.json(bm)

            // await UserModel.find({}, { projection: {'bookmarks': 1}
            // }).then((err, result) => {
            //     const bookmarked = result[0].bookmarks
            //     res.json(bookmarked)})

        }catch(err){
            console.log(err)
            res.status(500).json({
                message: 'Не удалось получить список закладок'
            })
        }
    }
    async addUserZ(req, res, next){
        try{
            const id = req.params.id
            const user = await userService.addUserZ(id)
            const userId = req.userId

            await UserModel.updateOne(
                {
                    _id: userId
                },
                {
                    $addToSet: {bookmarksUser: user._id}
                }
            )
            res.json({
                success: true
            })
        }catch(err){
            console.log(err)
            res.status(500).json({
                message: 'Не удалось добавить в закладки'
            })
        }
    }
    async remUserZ(req, res, next){
        
            try{
                const id = req.params.id
                const user = await userService.remUserZ(id)
                const userId = req.userId
    
                await UserModel.updateOne(
                    {
                        _id: userId
                    },
                    {
                        $pull: {bookmarksUser: user._id}
                    }
                )
                res.json({
                    success: true
                })
            }catch(err){
                console.log(err)
                res.status(500).json({
                    message: 'Не удалось убрать из закладок'
                })
            }
    }
    async getAllUserZ(req, res, next){
        try{
            const userId = req.userId
            const bookmarked = await UserModel.findById(
                {
                    _id: userId
                })
            
            const bm = []
            for (let i = 0; i < bookmarked.bookmarksUser.length; i++){
                const bookmarks = await UserModel.findById(
                {
                    _id: bookmarked.bookmarksUser[i]
                })
                bm.push(bookmarks)
            }
            res.json(bm)

            // const userId = req.params.id
            // await UserModel.aggregate([
            //     {
            //         $match: {_id: userId}
            //     },
            //     {
            //         $lookup: {
            //             from: "Applicate",
            //             localField: "bookmarks",
            //             foreignField: "_id",
            //             as: "bookmarked"
            //         }
            //     }
            // ])
            // let bm = await UserModel.find({}, { projection: { bookmarked: 1}})
            // res.json(bm)

            // await UserModel.find({}, { projection: {'bookmarks': 1}
            // }).then((err, result) => {
            //     const bookmarked = result[0].bookmarks
            //     res.json(bookmarked)})

        }catch(err){
            console.log(err)
            res.status(500).json({
                message: 'Не удалось получить список закладок'
            })
        }
    }
    async getSpec(req, res, next){
        try{
            const users = await UserModel.find({ role: 1 })
            res.json({users})
        }catch(err){
            console.log(err)
            res.status(501).json({
                message: 'Не удалось просмотреть специалистов'
            })
        }
    }
    async getSpecOne(req, res, next){
        try{
            const postId = req.body.id
            const post = await ApplicateModel.findById(postId)
            const userId = post.user
            const user = await UserModel.findById(userId)
            res.json({post, user})
        }catch(err){
            console.log(err)
            re.status(502).json({
                message: 'Не удалось найти специалиста'
            })
        }
    }
    async getOne(req, res, next){
        try{
            const userId = req.params.id
            const user = await UserModel.findById(userId)
            res.json({user})
        }catch(err){
            console.log(err)
            res.status(502).json({
                message: 'Не удалось найти пользователя'
            })
        }
    }
    async myApps(req, res, next){
        try{
            const id = req.userId
            const myApp = await ApplicateModel.find({ user: id })
            res.json(myApp)
        }catch(err){
            console.log(err)
            res.status(501).json({
                mesage: 'Не удалось подучить все созданные вами заявки'
            })
        }
    }
    async myFApps(req, res, next){
        try{
            const id = req.userId
            const myFApp = await FastApplicateModel.find({ user: id })
            res.json(myFApp)
        }catch(err){
            console.log(err)
            res.status(501).json({
                mesage: 'Не удалось подучить все созданные вами быстрые заявки'
            })
        }
    }
}



module.exports = new UserController()






