from django.urls import path


from .views import (    
    
    rooms,
    create_chat_room,
    ChatView
    )

urlpatterns = [
    path("", rooms, name='chat'),
    path("<str:room_name>/", ChatView.as_view(), name='room'),
    path('create-chat-room/<int:pk>', create_chat_room, name='create-chat-room')
    ]

