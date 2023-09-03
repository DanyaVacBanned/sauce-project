const Router = require('express')
const { body, check } = require('express-validator')
const multer = require('multer')
const fs = require('fs')

const chatController = require('../controllers/chat-controller')
const checkAdmin = require('../middlewares/check-admin-middleware')
const checkAuth = require('../middlewares/check-auth-middleware') 
const userController = require('../controllers/user-controller')
const authMiddleware = require('../middlewares/auth-middleware') 
const applicateController = require('../controllers/applicate-controller')
const { 
    loginValidation, 
    registerValidation, 
    updateValidation, 
    createApplicateValidation, 
    createPostValidation } = require('../validations/validator')
const postController = require('../controllers/post-controller')
const validationResult = require('../middlewares/handleValidationError')
const storage = require('../data/storage')
const adminController = require('../controllers/admin-controller')
const commentController = require('../controllers/comment-controller')
const userModel = require('../models/user-model')


//router

const router = new Router()


//deeps

const upload = multer({ storage })

//User

router.post('/registration', 
            registerValidation, 
            validationResult, 
            userController.registration)

router.post('/login', 
            loginValidation, 
            validationResult, 
            userController.login)

router.patch('/user-up', 
            // updateValidation, 
            checkAuth, 
            // validationResult, 
            userController.updateUser)

router.post('/logout', 
            userController.logout)

router.get('/activate/:link', 
            userController.activate)

router.get('/refresh', 
            userController.refresh)

router.get('/users', 
            checkAuth, 
            userController.getUsers)

router.get('/me', 
            checkAuth, 
            userController.getMe)
            
router.get('/get-spec', 
            checkAuth, 
            userController.getSpec)

router.get('/one-user/:id', 
            checkAuth, 
            userController.getOne)

//Applicate

router.get('/get-app/:id', 
            checkAuth, 
            applicateController.getOne)

router.post('/create', 
            checkAuth, 
            createApplicateValidation, 
            validationResult, 
            applicateController.create)

router.delete('/apps/delete/:id', 
            checkAuth, 
            applicateController.remove)

router.get('/apps', 
            checkAuth, 
            applicateController.getAll)

router.get('/apps/spec', 
            checkAuth, 
            applicateController.getAllSpec)

router.get('/apps/rab', 
            checkAuth, 
            applicateController.getAllRab)

router.get('/apps/spec-one', 
            checkAuth, 
            userController.getSpecOne)

router.get('/apps/me', 
            checkAuth, 
            userController.myApps)
            
//FastApplicate

router.get('/get-fastapp/:id', 
            checkAuth, 
            applicateController.getOneFA)

router.post('/create-fastapp', 
            checkAuth, 
            createApplicateValidation, 
            validationResult, 
            applicateController.createFA)

router.delete('/fastapps/delete/:id', 
            checkAuth, 
            applicateController.removeFA)

router.get('/fastapps', 
            checkAuth, 
            applicateController.getAllFA)

router.get('/fastapps/spec', 
            checkAuth, 
            applicateController.getAllFSpec)

router.get('/fastapps/rab', 
            checkAuth, 
            applicateController.getAllFRab)

router.get('/fastapps/me', 
            checkAuth, 
            userController.myFApps)

//filter

router.get('/filter-city', 
            checkAuth, 
            userController.filterCity)

router.get('/filter-spec', 
            checkAuth, 
            userController.filterSpec)

router.get('/filterAppSpec-city', 
            checkAuth, 
            applicateController.filterCityAppSpec)

router.get('/filterAppSpec-spec', 
            checkAuth, 
            applicateController.filterSpecAppSpec)

router.get('/filterAppRab-city', 
            checkAuth, 
            applicateController.filterCityAppRab)

router.get('/filterAppRab-spec', 
            checkAuth, 
            applicateController.filterSpecAppRab)

router.get('/filterFAppSpec-city', 
            checkAuth, 
            applicateController.filterCityFAppSpec)

router.get('/filterFAppSpec-spec', 
            checkAuth, 
            applicateController.filterSpecFAppSpec)

router.get('/filterFAppRab-city', 
            checkAuth, 
            applicateController.filterCityFAppRab)

router.get('/filterFAppRab-spec', 
            checkAuth, 
            applicateController.filterSpecFAppRab)

//bookmarks

router.post('/add-z/:id', 
            checkAuth, 
            userController.addAppZ)

router.delete('/rem-z/:id', 
            checkAuth, 
            userController.remAppZ)

router.get('/get-all-z', 
            checkAuth, 
            userController.getAllAppZ)

router.post('/add-z-fast/:id', 
            checkAuth, 
            userController.addFastAppZ)

router.delete('/rem-z-fast/:id', 
            checkAuth, 
            userController.remFastAppZ)

router.get('/get-all-z-fast', 
            checkAuth, 
            userController.getFastAllAppZ)

router.get('/get-all-user-z', 
            checkAuth, 
            userController.getAllUserZ)

router.post('/add-user-z/:id', 
            checkAuth, 
            userController.addUserZ)

router.delete('/rem-user-z/:id', 
            checkAuth, 
            userController.remUserZ)

//post

router.post('/post/create', 
            checkAuth, 
            // createPostValidation, 
            // validationResult, 
            postController.createPost)

router.get('/post/get-all', 
            checkAuth, 
            postController.getAllPost)

router.get('/post/get-one/:id', 
            checkAuth, 
            postController.getOnePost)

router.delete('/post/delete/:id', 
            checkAuth, 
            postController.deletePost)

router.patch('/post/patch/:id', 
            checkAuth, 
            postController.patchPost)

router.get('/post/getMy', 
            checkAuth, 
            postController.getMyPost)

//other

router.post('/upload', checkAuth, upload.single(), async (req, res) => {
    const url = req.file.originalname  
    const id = req.userId
    console.log(url, id)
    const user = await userModel.findById(id)
    user.imageUrl = url
    res.json({
        url: `api/uploads/${req.file.originalname}`,
      });
});

//admin login

router.post('/admin/login', 
            adminController.loginAdmin)

//admin post

router.post('/admin/create',
            checkAdmin,
            adminController.createPost)

router.patch('/admin/update/:id',
            checkAdmin,
            adminController.updatePost)

router.delete('/admin/delete/:id',
            checkAdmin,
            adminController.deletePost)

router.get('/admin/getAll',
            checkAdmin,
            adminController.getAllPost)

//chat

router.get('/chat', 
            checkAuth, 
            chatController.rout)

router.post('/chat/genRooms/:id', 
            checkAuth, 
            chatController.generateRoom)

router.post('/chat/add/:id', 
            checkAuth, 
            chatController.addMessage)

router.get('/chat/get/:id', 
            checkAuth, 
            chatController.getMessage)
            
router.get('/chats', 
            checkAuth, 
            chatController.getFullUser)
//comments

router.post('/comments/add/:id', 
            checkAuth, 
            commentController.add)

router.delete('/post/:postId/:commentId', 
            checkAuth, 
            commentController.delete)
            
router.get('/comments/getAllComments/:id', 
            checkAuth, 
            commentController.getAllComments)

module.exports = router
