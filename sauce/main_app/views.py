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

from django.views.generic.edit import FormView, CreateView
from django.views.generic.detail import DetailView




from .forms import (
    CreateEmployerAccountForm, 
    CreateCandidateAccountForm,
    ProfileUpdateForm,
    SauceLoginForm,
    CreateVacationForm

    )
from .models import (
    SauceUser, Employer, Candidate,
    Vacation
                     )





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
    employer = None
    candidate = None
    if request.method == "GET":
        user = SauceUser.objects.get(id=request.user.id)
        
        if user.role == "EMPLOYER":
            
            employer = Employer.objects.get(id=request.user.id)
            
        elif user.role == "CANDIDATE":
            candidate = Candidate.objects.get(id=request.user.id)
        role = employer if employer is not None else candidate
       
        context = {
            "user_info": user,
            "role": role
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


class CreateVacationView(CreateView, LoginRequiredMixin):
    form_class = CreateVacationForm
    template_name = "main_app/ads/create-vacation.html"
    model = Vacation
    
    def __init__(self, **kwargs: Any) -> None:
        super(CreateVacationView, self).__init__()

    def get_success_url(self) -> str:
        
        url = reverse_lazy('profile-page', args=[self.request.user.id])
        print(url)
        return url

    def form_valid(self, form: Any) -> HttpResponse:
        vacation = form.save(commit=False)
        vacation.employer = SauceUser.objects.get(id=self.request.user.id)
        vacation.save()
        if vacation is not None:
            return super(CreateVacationView, self).form_valid(form)

    def get(self, request: HttpRequest, *args: str, **kwargs: Any) -> HttpResponse:
        if SauceUser.objects.get(id=request.user.id).role == "EMPLOYER":
            return super(CreateVacationView, self).get(request)
        else:
            return redirect('profile-page', request.user.id)


class CandidatesListView(DetailView, LoginRequiredMixin):
    def get(self, request: HttpRequest, *args: Any, **kwargs: Any) -> HttpResponse:
        
        if SauceUser.objects.get(id=request.user.id).role == "EMPLOYER":
            candidates = Candidate.objects.all()
            return render(
                request=request,    
                template_name="main_app/ads/candidates.html",
                context={"candidates":candidates}
                )
        else:
            return redirect('vacations')
        
class AdsListView(DetailView, LoginRequiredMixin):
    def get(self, request: HttpRequest, *args: Any, **kwargs: Any) -> HttpResponse:
        if SauceUser.objects.get(id=request.user.id).role == "CANDIDATE":
            vacations = Vacation.objects.all()
            return render(
                request=request,
                template_name="main_app/ads/vacations.html",
                context={'vacations':vacations}
                )
        else:
            return redirect('employers')
        


class LoginPage(LoginView):
    template_name = "main_app/auth/login.html"

    redirect_authenticated_user = True
    
    form_class = SauceLoginForm
    def get_success_url(self) -> str:
        return reverse_lazy('profile-page', self.request.user.id)

    def form_valid(self, form: Any) -> HttpResponse:
        print(form)
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
                            phone_number=phone_number
                            )

        if user is not None:
            login(self.request, user)
            return redirect('profile-page', self.request.user.id)
        else:
            return self.form_invalid(form)
        
    def form_invalid(self, form: AuthenticationForm) -> HttpResponse:
        return super().form_invalid(form)
                
 
class RegisterCandidate(FormView):
    form_class = CreateCandidateAccountForm
    template_name = 'main_app/auth/register-candidate.html'
    
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
    template_name = 'main_app/auth/register-employer.html'
    
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