from typing import Any, Dict
from django.contrib.auth.forms import AuthenticationForm

from django.http import HttpRequest, HttpResponse
from django.shortcuts import render, redirect
from django.urls import reverse_lazy, reverse

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
    CreateVacationForm,
    UrgentAppCreateForm

    )
from .models import (
    SauceUser, Employer, Candidate,
    Vacation, UrgentApplications, Comments,
    News
                     )


def news_page(request):
    template_name = "main_app/other-page/news.html"
    if request.method == "GET":
        context = {
            "posts": News.objects.all().order_by('-created')
            }
        return render(request=request, template_name=template_name, context=context)


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
    template_name = 'main_app/auth/main_register.html'
    return render(request=request, template_name=template_name)

@login_required
def profile_page(request, *args, **kwargs):
    template_name = 'main_app/profile/profile.html'
    employer = None
    candidate = None
    if request.method == "GET":
        user = SauceUser.objects.get(id=request.user.id)
        if user.is_superuser == True:
            return redirect('admin:index')


        if user.role == "EMPLOYER":
            
            employer = Employer.objects.get(id=request.user.id)
            
        elif user.role == "CANDIDATE":
            candidate = Candidate.objects.get(id=request.user.id)
        role = employer if employer is not None else candidate
        print("user_id = ", user.id)
        context = {
            "user_info": user,
            "role": role
            }
        return render(request, template_name, context)

def comments(request, pk):
    template_name = "main_app/ads/comments.html"
    model = Comments
    if request.method == "GET":
        all_comments = model.objects.filter(id=pk).order_by("-created")
        return render(request=request, template_name=template_name, context={"comments": all_comments})


def another_user_profile(request, pk):
    template_name = "main_app/profile/profile.html"

    if request.method == "GET":
        user = SauceUser.objects.get(id=pk)
        context = {
            "user_info": user,
            "role": user.role
        }
        return render(request, template_name, context)



@login_required
def update_profile(request, *args, **kwargs):
    template_name = 'main_app/profile/profile-update.html'
    
    user_instance = SauceUser.objects.get(id=request.user.id)
    update_profile_form = ProfileUpdateForm(
        request.POST or None,
        request.FILES or None,
        instance=user_instance
        )
    if request.method == "GET":
        return render(request, template_name, context={'user':request.user, 'update_form':update_profile_form})

    if request.method == "POST":
        if update_profile_form.is_valid():
            print("Форма валидна: ", update_profile_form)
            update_profile_form.save()
            return redirect('profile-page', request.user.id)
        else:
            print("Форма невалидна")
            return redirect("profile-page", request.user.id)
        

@login_required
def create_urgent_app(request):
    if not request.user.is_authenticated:
        redirect('login')
    if request.method == "GET":
        form = UrgentAppCreateForm()
        return render(request, "main_app/ads/create-urgent-app.html", {"form":form})

    if request.method == "POST":
        form = UrgentAppCreateForm(request.POST)
        print(form.is_valid())
        if form.is_valid():
            application = form.save(commit=False)
            application.user = SauceUser.objects.get(id=request.user.id)
            
            application.save()
            print("Заявка размещена")
        
        redirect("urgent-applications")


@login_required
def urgent_applcations_page(requset, *args, **kwargs):
    
    if requset.method == "GET":
        applications = UrgentApplications.objects.all()
        if list(applications) == []:
            context = {}
        
        else:
            applications = UrgentApplications.objects.order_by("-created")
            context = {
                "content":applications
                }
        return render(request=requset, 
                        template_name='main_app/ads/urgent.html',
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
            return redirect('candidates')
        


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
                

def register_candidate_view(request):
    if request.method == 'POST':
        print("POST запрос на register_employer_form", request.POST)
        form = CreateCandidateAccountForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request=request, user=user)
            return redirect('profile-page', user.id)
        else:
            print("Форма невалидна")
    else:
        form = CreateCandidateAccountForm()
    return render(request, 'main_app/auth/register-candidate.html', {'form': form})


def register_employer_view(request):
    if request.method == 'POST':
        print("POST запрос на register_employer_form", request.POST)
        form = CreateEmployerAccountForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request=request, user=user)
            return redirect('profile-page', user.id)
        else:
            print("Форма невалидна")
    else:
        form = CreateEmployerAccountForm()
    return render(request, 'main_app/auth/register-employer.html', {'form': form})


# class RegisterEmployer(FormView):
    
#     form_class = CreateEmployerAccountForm
#     template_name = 'main_app/auth/register-employer.html'
    
#     redirect_authenticated_user = True


#     def get_success_url(self) -> str:
#         return reverse_lazy("profile-page", self.request.user.id)

#     def form_valid(self, form: Any) -> HttpResponse:
#         user = form.save()
#         print("user: ", user)
#         if user is not None:
#             login(request=self.request, user=user)
            
#         return redirect("profile-page", user.id)
    

#     def get(self, *args: str, **kwargs: Any) -> HttpResponse:


#         if self.request.user.is_authenticated:
#             return redirect('profile-page', self.request.user.id)
    
#         return super(RegisterEmployer, self).get(*args, **kwargs)