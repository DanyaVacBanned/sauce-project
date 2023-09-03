

const PostModel = require('../models/post-model')
const UserModel = require('../models/user-model')


class CommentController {
    async add(req, res, next){
      try{
        const postId = req.params.id
        const userId = req.userId
        const comment = req.body.text
        const post = await PostModel.findById(postId)
        post.comments.push({ userId, comment })
        await post.save()
        res.json(post)
      }catch(err){
        console.log(err)
        res.status(502).json({
            message: 'Не удалось oставить комментрарий'
        })
      }

    }
    async delete(req, res, next){
      try{
        const { postId, commentId } = req.params
        const post = await PostModel.findById(postId)
        const commIdx = await post.comments.findIndex((comments) => comments._id == commentId)
        
        if(commIdx > -1){
            post.comments.splice(commIdx, 1)
            
        }else{
            res.status(404).json({
                message: 'Комментарий не найден'
            })
        }
        await post.save()
        res.json({
          success: true
        })
      }catch(err){
        console.log(err)
        res.status(501).json({
            message: 'Не удалось удалить комментарий'
        })
      }
        

    }
    async getAllComments(req, res, next){
      try{
        const postId = req.params.id
        const post = await PostModel.findById(postId)
        const allComments = post.comments
        res.json(allComments)
      }catch(err){
        console.log(err)
        res.status(501).json({
          message: 'Не удалось просмотреть все коментaрии'
        })
      }
    }
}

module.exports = new CommentController()