from django.urls import path 
from django.contrib.auth.views import LogoutView


from .views import (
    LoginPage,
    CandidatesListView,
    AdsListView,
    CreateVacationView,
    register_page, main_page,
    profile_page, update_profile,
    register_employer_view,
    register_candidate_view,
    urgent_applcations_page,
    create_urgent_app,
    another_user_profile,
    news_page
    
                   )



urlpatterns = [
    

    path("", main_page, name="main_page"),

    path('registration/', view=register_page, name='registration'),
    path("registration/employer", view=register_employer_view, name="registration-employer"),
    path('registration/candidate', view=register_candidate_view, name="registration-candidate"),

    path('profile/<int:pk>', view=profile_page, name='profile-page'),
    path('profile/<int:pk>/update/', view=update_profile, name='update-profile-page'),
    path('user-profile/<int:pk>', view=another_user_profile, name='user-profile'),

    path('logout', view=LogoutView.as_view(next_page='main_page'), name='logout'),
    path('login/', view=LoginPage.as_view(), name="login"),

    path('candidates/', view=CandidatesListView.as_view(), name='candidates'),
    path('vacations/', view=AdsListView.as_view(), name="vacations"),
    path('vacations/create-vacation/', view=CreateVacationView.as_view(), name='create-vacation'),
    path('news/', view=news_page, name="news"),

    path('urgent-applications/', view=urgent_applcations_page, name='urgent-applications'),
    path('urgent-applications/create', view=create_urgent_app, name='urgent-create')
    ]


