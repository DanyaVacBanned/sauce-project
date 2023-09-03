
const uuid = require('uuid')

const UserModel = require('../models/user-model')
const trimStr = require('../utils/trimStr')
const chatService = require('../service/chat-service')
const MessageModel = require('../models/message-model')
const sortNDateMess = require('../utils/sorts')

class ChatController {

    async generateRoom(req, res, next){
      try{
        const userFirstId = req.params.id
        const userSecondId = req.body.id
        
        const user1 = await UserModel.findById(userFirstId)
        const user2 = await UserModel.findById(userSecondId)
        const users = await chatService.checkRooms(user1.roomId, user2.roomId)

        if(users == 'success'){
            res.json({
                success: true
            })
        }else{
            const id = uuid.v4()
            user1.roomId.push(id)
            user2.roomId.push(id)
            await user1.save()
            await user2.save()
            res.json({ user1, user2 })
        }

        

      }catch(err){
        console.log(err)
        res.status(501).json({
            message: 'Не удалось создать чат'
        })
      }

    }
    async addMessage(req, res, next){
        const text = req.body.text
        const sender = req.userId
        const rec = req.params.id
        const message = await new MessageModel({sender: sender, text: text, recipient: rec})
        await message.save()
        res.json({ message })
    }
    async getMessage(req, res, next){
        const sender = req.userId
        const rec = req.params.id
        const message1 = await chatService.addRooms(sender, rec)
        const message2 = await chatService.addRooms(rec, sender)
        const allMess = [...message1, ...message2]
        const messages = sortNDateMess(allMess)
        res.json({ messages })
    }
    async rout(req, res, next) {
        res.setHeader("Access-Control-Allow-Origin", "*");
      
        res.setHeader(
          "Access-Control-Allow-Methods",
          "GET, POST, OPTIONS, PUT, PATCH, DELETE"
        );
      
        res.setHeader(
          "Access-Control-Allow-Headers",
          "X-Requested-With,content-type"
        );
      
        res.send(".");
    }
    async getFullUser(req, res, next){
      try{
        const id = req.userId
        const user = await MessageModel.find({ sender: id})
        const userR = await MessageModel.find({ recipient: id})
        const allUsers = [...user, ...userR]
        res.json(allUsers)
      }catch(err){
        console.log(err)
        res.status(503).json({
          message: 'Не удалось получить пользователей'
        })
      }
    }
}


module.exports = new ChatController()