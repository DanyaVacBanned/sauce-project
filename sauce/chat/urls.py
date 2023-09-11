from django.urls import path


from .views import (    
    
    rooms, ChatView
    )

urlpatterns = [
    path("", rooms, name='chat'),
    path("<str:room_name>/", ChatView.as_view(), name='room')
    ]