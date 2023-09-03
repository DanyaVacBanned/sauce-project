const MessageModel = require('../models/message-model')

class ChatServise {

    async checkRooms(user1, user2){
        for(let i = 0; i < user1.length; i++){
            for(let j = 0; j < user2.length; j++){
                if(user1[i] == user2[j]){
                    return 'success'
                }
            }   
        }
        return 'unsuccess'
    }
    async addRooms(user1, user2){
        const message = await MessageModel.find(
            {
                sender: user1, recipient: user2
            }).then(res => { return res })
              .catch(err => console.log(err))
               
           
            
        return message
    }
}



module.exports = new ChatServise()

