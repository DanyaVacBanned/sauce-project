from django.db import models 

from django.contrib.auth import get_user_model

SauceUser = get_user_model()

class ChatRoom(models.Model):
    room_id = models.CharField(max_length=250)
    current_user = models.ForeignKey(SauceUser, on_delete=models.CASCADE, related_name="current_user")
    user_1 = models.ForeignKey(SauceUser, on_delete=models.CASCADE, related_name="user_1")
    user_2 = models.ForeignKey(SauceUser, on_delete=models.CASCADE, related_name="user_2")

    def __str__(self):
        return self.room_id

class ChatMessage(models.Model):
    user = models.ForeignKey(
        SauceUser, related_name="messages", on_delete=models.CASCADE
        )
    chat_room = models.ForeignKey(ChatRoom, on_delete=models.CASCADE, related_name='chat_room', max_length=250)
    message = models.TextField(max_length=3000)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now = True)


    def __str__(self):
        return self.message
    

