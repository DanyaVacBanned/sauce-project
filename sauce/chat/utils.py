import string
import random


class UniqueChatRoomId:

    @classmethod
    def encode_unique_id(
        cls, user_id, 
        user_email: str,
        second_user_id,
        second_user_email: str,
        
                         ):
        email_1 = user_email.replace("@", "").replace(".", "")
        email_2 = second_user_email.replace("@", "").replace(".","")
        token = f"{user_id}{email_1}.{second_user_id}{email_2}"
        return token


    
    
                    