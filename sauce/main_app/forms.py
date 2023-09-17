from collections.abc import Mapping
from typing import Any
from django.contrib.auth.forms import UserCreationForm

from django import forms


from .models import (
    SauceUser, Employer, Candidate,
    Vacation, UrgentApplications
    )


class UrgentAppCreateForm(forms.ModelForm):
    title = forms.CharField(
        max_length=150,
        required=True,
        help_text=False
        )
    description = forms.CharField(
        required=True,
        help_text=False
        )
    deadlines = forms.DateField(
        required=True,
        help_text=False
        )
    
    class Meta:
        model = UrgentApplications
        fields = [
            "title",
            "description",
            "deadlines",  
            ]

    
        

class CreateVacationForm(forms.ModelForm):
    title = forms.CharField(
        max_length=150,
        required=True,
        help_text=False
        )
    description = forms.CharField(
        required=True,
        help_text=False
        )
    award = forms.IntegerField(required=True, help_text=False)
    deadlines = forms.DateField(
        required=True,
        help_text=False,
        widget=forms.DateInput()
        )
    class Meta:
        model = Vacation
        fields = [
            "title",
            "description",
            "award",
            "deadlines"
            ]




class SauceLoginForm(forms.Form):
    def __init__(self, *args, **kwargs):
        self.request = kwargs.pop('request', None)
        super(SauceLoginForm, self).__init__(*args, **kwargs)
    email = forms.EmailField(help_text=False, required=False)
    phone_number = forms.CharField(help_text=False, required=False)
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
    class Meta:
        model = SauceUser
        fields = ['username', 'second_name', 'email', 'phone_number','city', 'citizenship', 'profile_description']


        
    
    