from django.urls import path
from Api.views.user_views import get_users, get_user_profile, register_user, MyTokenObtainPairView, update_user_profile

urlpatterns = [
    path('login', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('', get_users, name='users'),
    path('register', register_user, name='register'),
    path('profile', get_user_profile, name='user-profile'),
    path('profile/update', update_user_profile, name='user-profile-update')
]