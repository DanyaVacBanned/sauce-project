const express = require('express')
const { Server } = require("socket.io");
const http = require('http')

const UserModel = require('../models/user-model')
const chatService = require('../service/chat-service')

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
      origin: "*",
      methods: [ "GET", "POST" ],
    },
  });

async function socketIO(){
    io.on("connection", 
    (socket) => 
    {
        socket.on("join", 
        ({ user, room }) => 
        {
          socket.join(room)
      
          const user = 1
           
          io.to(user.room).emit("room", 
          {
            data: { users: chatService.getRoomUsers(user.room) },
          })
        })
      
        socket.on("sendMessage", 
        async ({ message, userId }) => 
        {
          const user = UserModel.findById(userId)
          const room = user.roomId
          
          if (user) 
          {
            io.to(room).emit("message", { data: { user, message } })
          }
        })
      


        io.on("disconnect", () => {
          console.log("Disconnect");
        });
      });
}


module.exports = socketIO