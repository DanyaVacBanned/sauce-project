from typing import Any, Dict
from django.contrib.auth.forms import AuthenticationForm

from django.http import HttpRequest, HttpResponse
from django.shortcuts import render, redirect
from django.urls import reverse_lazy

from django.contrib import messages

from django.contrib.auth.views import LoginView
from django.contrib.auth import login, authenticate
from django.contrib.auth.decorators import login_required

from django.contrib.auth.mixins import LoginRequiredMixin

from django.views.generic.edit import FormView




from .forms import (
    CreateEmployerAccountForm, 
    CreateCandidateAccountForm,
    ProfileUpdateForm,
    SauceLoginForm,

    )
from .models import SauceUser





def main_page(request):
    template_name = "main_app/index.html"
    context = {}
    if request.user.is_authenticated:
        context['id'] = request.user.id
    if context == {}:
        context = None

        
    return render(
        request=request, 
        template_name=template_name,
        context=context
        )


def register_page(request):
    template_name = 'main_app//auth/main_register.html'
    return render(request=request, template_name=template_name)

@login_required
def profile_page(request, *args, **kwargs):
    template_name = 'main_app/profile/profile.html'
    if request.method == "GET":
        user = SauceUser.objects.get(id=request.user.id)
        context = {
            "user_info": user
            }
        return render(request, template_name, context)
    
    
        
@login_required
def update_profile(request, *args, **kwargs):
    template_name = 'main_app/profile/profile-update.html'
    if request.method == "POST":
       
        update_profile_form = ProfileUpdateForm(
            request.POST,
            request.FILES,
            instance=request.user
            )
        
        if update_profile_form.is_valid():
            update_profile_form.save()
            messages.success(request, "Ваш аккаунт успешно обновлен")
            return redirect('profile-page', request.user.id)
        
    if request.method == "GET":
        update_profile_form = ProfileUpdateForm(instance=request.user)
        context={
            'user':request.user,
            'update_form': update_profile_form,
            }
        
        return render(request=request,
                      template_name=template_name,
                      context=context
                      )
        

class LoginPage(LoginView):
    template_name = "main_app/auth/login.html"

    redirect_authenticated_user = True
    
    form_class = SauceLoginForm
    def get_success_url(self) -> str:
        return reverse_lazy('profile-page', self.request.user.id)

    def form_valid(self, form: Any) -> HttpResponse:
        try:
            email = form.cleaned_data['email']
        except KeyError:
            email = None
        try:
            phone_number = form.cleaned_data['phone_number']
        except KeyError:
            phone_number = None
        
        password = form.cleaned_data['password']
        user = authenticate(self.request, 
                            email=email, 
                            password=password, 
                            phone_number=phone_number)

        if user is not None:
            login(self.request, user)
            return redirect('profile-page', self.request.user.id)
        else:
            return self.form_invalid(form)
        
    def form_invalid(self, form: AuthenticationForm) -> HttpResponse:
        return super().form_invalid(form)
            
      
    
        

class RegisterCandidate(FormView):
    form_class = CreateCandidateAccountForm
    template_name = 'main_app/auth/register.html'
    
    redirect_authenticated_user = True


    def form_valid(self, form: Any) -> HttpResponse:
        user = form.save()
        
        
        if user is not None:
            print(user.email)
            login(request=self.request, user=user)
        return redirect('profile-page', self.request.user.id)
    

    def get(self, *args: str, **kwargs: Any) -> HttpResponse:


        if self.request.user.is_authenticated:
            return redirect('profile-page', self.request.user.id)
    
        return super(RegisterCandidate, self).get(*args, **kwargs)

class RegisterEmployer(FormView):
    
    form_class = CreateEmployerAccountForm
    template_name = 'main_app/auth/register.html'
    
    redirect_authenticated_user = True


    def form_valid(self, form: Any) -> HttpResponse:
        user = form.save()

        if user is not None:
            print(self.request.user.id)
            login(request=self.request, user=user)
            
        return redirect('profile-page', self.request.user.id)
    

    def get(self, *args: str, **kwargs: Any) -> HttpResponse:


        if self.request.user.is_authenticated:
            return redirect('profile-page', self.request.user.id)
    
        return super(RegisterEmployer, self).get(*args, **kwargs)