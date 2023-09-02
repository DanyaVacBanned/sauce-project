from typing import Any

from django.http import HttpRequest, HttpResponse
from django.shortcuts import render, redirect
from django.urls import reverse_lazy

from django.contrib.auth import login
from django.contrib.auth.decorators import login_required

from django.views.generic.edit import FormView


from .forms import CreateEmployerAccountForm, CreateCandidateAccountForm


def main_page(request):
    template_name = "main_app/index.html"
    return render(request=request, template_name=template_name)

@login_required(login_url='employer-reg')
def profile_page(request):
    template_name = "main_app/profile.html"

    return render(request=request, template_name=template_name)


def register_page(request):
    template_name = 'main_app/main_register.html'
    return render(request=request, template_name=template_name)



class RegisterCandidate(FormView):
    form_class = CreateCandidateAccountForm
    template_name = 'main_app/register.html'
    success_url = reverse_lazy('profile-page')
    redirect_authenticated_user = True


    def form_valid(self, form: Any) -> HttpResponse:
        user = form.save()
        
        
        if user is not None:
            print(user.email)
            login(request=self.request, user=user)
        return super(RegisterCandidate, self).form_valid(form)
    

    def get(self, *args: str, **kwargs: Any) -> HttpResponse:


        if self.request.user.is_authenticated:
            return redirect('profile-page')
    
        return super(RegisterCandidate, self).get(*args, **kwargs)

class RegisterEmployer(FormView):
    
    form_class = CreateEmployerAccountForm
    template_name = 'main_app/register.html'
    success_url = reverse_lazy('profile-page')
    redirect_authenticated_user = True


    def form_valid(self, form: Any) -> HttpResponse:
        user = form.save()
        user.is_employer = True
        
        if user is not None:
             
            login(request=self.request, user=user)
        return super(RegisterEmployer, self).form_valid(form)
    

    def get(self, *args: str, **kwargs: Any) -> HttpResponse:


        if self.request.user.is_authenticated:
            return redirect('profile-page')
    
        return super(RegisterEmployer, self).get(*args, **kwargs)