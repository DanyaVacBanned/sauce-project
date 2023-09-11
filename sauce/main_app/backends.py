
from django.conf import settings
from django.contrib.auth import get_user_model


class SauceAuthenticationBackend(object):

    def authenticate(self, request, email = None, phone_number = None, password = None):
        sauce_user = get_user_model()
        if email == "":
            email = None
        if phone_number == "":
            phone_number = None

        
        
        print(email, "mail")
        print(phone_number, "phone", type(phone_number))
        try:
            if phone_number is None:
                user = sauce_user.objects.get(email=email)
            if email is None:
                user = sauce_user.objects.get(phone_number=phone_number)

            
            return user 
        
        except sauce_user.DoesNotExist:
            return None
        
    def get_user(self, user_id):
        user_model = get_user_model()
        try:
            return user_model.objects.get(id=user_id)
        except user_model.DoesNotExist:
            return None
        
