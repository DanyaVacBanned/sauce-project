from collections.abc import Mapping
from typing import Any
from django.contrib.auth.forms import UserCreationForm

from django import forms
from django.forms.utils import ErrorList

from .models import SauceUser, Employer, Candidate



class SauceLoginForm(forms.Form):
    def __init__(self, *args, **kwargs):
        self.request = kwargs.pop('request', None)
        super(SauceLoginForm, self).__init__(*args, **kwargs)
    email = forms.EmailField(help_text=False, required=False)
    password = forms.CharField(help_text=False, required=True, widget=forms.PasswordInput)
    class Meta:
        model = SauceUser
        fields = ['email', 'phone_number', 'password']



class CreateCandidateAccountForm(UserCreationForm):
    def __init__(self, *args: Any, **kwargs: Any) -> None:
        super().__init__(*args, **kwargs)
        for fieldname in ['username', 'password1', 'password2']:
            self.fields[fieldname].help_text = None

    class Meta:
        model = Candidate
        fields = ['email', 'username']

class CreateEmployerAccountForm(UserCreationForm):
    
    def __init__(self, *args: Any, **kwargs: Any) -> None:
        super().__init__(*args, **kwargs)
        for fieldname in ['username', 'password1', 'password2']:
            self.fields[fieldname].help_text = None

    class Meta:
        model = Employer
        fields = ['email', "username", 'city', 'address']

class ProfileUpdateForm(forms.ModelForm):
    email = forms.EmailField()

    class Meta:
        model = SauceUser
        fields = ['username', 'email', 'city', 'profile_image']
        

