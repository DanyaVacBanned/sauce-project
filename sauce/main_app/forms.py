from typing import Any
from django.contrib.auth.forms import UserCreationForm

from .models import SauceUser, Employer



class CreateCandidateAccountForm(UserCreationForm):
    def __init__(self, *args: Any, **kwargs: Any) -> None:
        super().__init__(*args, **kwargs)
        for fieldname in ['username', 'password1', 'password2']:
            self.fields[fieldname].help_text = None

    class Meta:
        model = SauceUser
        fields = ['email', 'username']

class CreateEmployerAccountForm(UserCreationForm):
    
    def __init__(self, *args: Any, **kwargs: Any) -> None:
        super().__init__(*args, **kwargs)
        for fieldname in ['username', 'password1', 'password2']:
            self.fields[fieldname].help_text = None

    class Meta:
        model = Employer
        fields = ['email', "username", 'city', 'address']
        
    