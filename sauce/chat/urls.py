from django.urls import path


from .views import (    
    
    index, chat_room
    )

urlpatterns = [
    path("", index, name='chat'),
    path("<str:room_name>/", chat_room, name='room')
    ]