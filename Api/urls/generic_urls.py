from django.urls import path
from Api.views.generic_views import error_404

urlpatterns = [path('<route>', error_404)]
