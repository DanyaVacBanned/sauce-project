from django.shortcuts import render, redirect

from django.views.generic import View

from .models import ChatMessage, ChatRoom

class ChatView(View):
    def get(self, request, room_name):
        
        if request.user.is_authenticated == False:
            return redirect('login')
        try:
            chat_room = ChatRoom.objects.get(room_id=room_name)
        except ChatRoom.DoesNotExist:
            chat_room = ChatRoom.objects.create(room_id = room_name)
        chat_messages = ChatMessage.objects.filter(chat_room=chat_room)
        chat_queryset = chat_messages.order_by("-created")


        chat_message_count = len(chat_queryset)
        
        if chat_message_count > 0:
            first_message_id = chat_queryset[len(chat_queryset)-1].id
        else:
            first_message_id = -1
        
        if first_message_id != -1:
            try:
                previos_id = ChatMessage.objects.filter(pk__lt=first_message_id).order_by("-pk")[:1][0].id
            except IndexError:
                previos_id = -1
            chat_messages = reversed(chat_queryset)
        else:
            chat_messages = []



        return render(
            request, "chat/room.html",
            context={
                "room_name": room_name,
                "username": request.user.username,
                "chat_messages":chat_messages,
                "first_message_id": first_message_id
                }
            )


def rooms(request):
    if request.user.is_authenticated == False:
        return redirect('login')
    
    if request.method == "GET":
        all_rooms = ChatRoom.objects.filter(current_user=request.user.id)
        
        if len(all_rooms) == 0:
            context = {"dialogs":"None"}
        else:
            context = {"dialogs":all_rooms}

        return render(request, "chat/index.html", context=context)


