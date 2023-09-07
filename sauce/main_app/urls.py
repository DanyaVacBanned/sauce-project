from django.urls import path 
from django.contrib.auth.views import LogoutView


from .views import (
    RegisterEmployer, RegisterCandidate, LoginPage,
    register_page, main_page, profile_page, update_profile
                   )



urlpatterns = [
    path("", main_page, name="main_page"),
    path('registration/', view=register_page, name='registration'),
    path("registration/employer", view=RegisterEmployer.as_view(), name="registration-employer"),
    path('registration/candidate', view=RegisterCandidate.as_view(), name="registration-candidate"),
    path('profile/<int:pk>', view=profile_page, name='profile-page'),
    path('profile/<int:pk>/update/', view=update_profile, name='update-profile-page'),
    path('logout/', view=LogoutView.as_view(next_page='main_page'), name='logout'),
    path('login/', view=LoginPage.as_view(), name="login")
    ]


