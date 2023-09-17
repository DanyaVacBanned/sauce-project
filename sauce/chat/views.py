from django.shortcuts import render, redirect
from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required

from django.views.generic import View

from .models import ChatMessage, ChatRoom
# from .utils import UniqueChatRoomId


class ChatView(View):
    def get(self, request, room_name):

        if request.user.is_authenticated == False:
            return redirect('login')
        all_users_in_room = []
        users_in_room = ChatRoom.objects.all()
        for user in users_in_room:
            all_users_in_room.append(user.user_1.id)
            all_users_in_room.append(user.user_2.id)
        if request.user.id not in all_users_in_room:
            return redirect("chat")

        # unique_room_id = UniqueChatRoomId.encode_unique_id(request.user.id, request.user.email)
        chat_room = ChatRoom.objects.get(room_id = room_name)
        
        chat_messages = ChatMessage.objects.filter(chat_room=chat_room)
        chat_queryset = chat_messages.order_by("-created")


        chat_message_count = len(chat_queryset)
        
        if chat_message_count > 0:
            first_message_id = chat_queryset[len(chat_queryset)-1].id
        else:
            first_message_id = -1
        
        if first_message_id != -1:
            
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

@login_required
def create_chat_room(request, pk):
    chat_room_model = ChatRoom
    user_model = get_user_model()

    if request.method == "GET":
        from_user_id = request.user.id
        user_1 = user_model.objects.get(id=from_user_id)
        user_2 = user_model.objects.get(id=pk)
       
        chat_room_model.objects.create(
            room_id = f"{user_1.username}-{user_2.username}-dialog-{user_1.id}-{user_2.id}",
            user_1 = user_1,
            user_2 = user_2
            )
        
        
        return redirect("chat")





    
    



def rooms(request):
    if request.user.is_authenticated == False:
        return redirect('login')
    
    if request.method == "GET":
        user = get_user_model()
        user = user.objects.get(id=request.user.id)
        all_rooms = ChatRoom.objects.raw(
            f"""
            SELECT * FROM chat_chatroom
            WHERE user_1_id = {user.id} OR user_2_id = {user.id}
            """
        )
        print(all_rooms)
        if len(all_rooms) == 0:
            context = {}
        else:
            context = {"dialogs":all_rooms}

        return render(request, "chat/index.html", context=context)


