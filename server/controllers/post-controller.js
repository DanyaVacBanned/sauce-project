
const PostModel = require('../models/post-model')


class PostController {

    async createPost(req, res, next){
        try{
            const doc = new PostModel({
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
    async getAllPost(req, res, next){
        try{
            const posts = await PostModel.find()
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
    async getOnePost(req, res, next){
        try{
            const postId = req.params.id
                PostModel.findOneAndUpdate(
                {
                    _id: postId
                },
                {
                    $inc: { viewsCount: 1 }
                },
                {
                    returnDocument: 'after'
                }
                ).then((data, err) => {
                    if(err){
                        console.log(err)
                        return res.status(500).json({
                            message: 'Не удалось получить статью'
                        })
                    }
                    if(!data){
                        return res.status(404).josn({
                            message: 'Статья не найдена'
                        })
                    }
                    res.json(data)
                })
            
        }catch(err){
            console.log(err)
            res.status(501).json({
                message: 'Не удалось найти статью'
            })
        }
    }
    async deletePost(req, res, next){
        try{
            const postId = req.params.id
                PostModel.findOneAndDelete(
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
    async patchPost(req, res, next){
        try{
            const postId = req.params.id
            
            await PostModel.findOneAndUpdate(
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
    async getMyPost(req, res, next){
        const post = await PostModel.find({ user: req.userId})
        res.json({post})
    }
}

module.exports = new PostController()



