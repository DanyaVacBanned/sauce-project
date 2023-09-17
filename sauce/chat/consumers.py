import json 


from transliterate import translit

from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async


from django.contrib.auth import get_user_model
from .models import ChatMessage, ChatRoom

User = get_user_model()

class ChatConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.room_name_eng =translit(self.room_name, "ru", reversed=True)
        self.room_group_name = f"chat_{self.room_name_eng}_{self.scope['user'].id}"
        
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data=None):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        username = text_data_json['username']
        
        
        if message != "":
            user = await self.get_user(self.scope['user'].id)
            await self.create_message(message, user)
        
        await self.channel_layer.group_send(
                self.room_group_name, {
                    "type":"chat.message",
                    "message": message,
                    "username": username,
                    
                    }
            )
        
        
    async def chat_message(self, event):
        message = event["message"]
        username = event['username']
        
        await self.send(text_data=json.dumps(
            {
                "message": message,
                "username": username,
                
                
                }
            )
            )
    @database_sync_to_async
    def create_message(self, message, user):    
        chat_room = ChatRoom.objects.get(room_id=self.room_name)
        ChatMessage.objects.create(message=message, user=user, chat_room = chat_room)


  

    @database_sync_to_async
    def get_user(self, user_id):
        
        return User.objects.get(id=user_id)
