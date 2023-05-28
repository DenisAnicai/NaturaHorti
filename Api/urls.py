from django.urls import path

from .views import get_product, get_products, get_routes, error_404

urlpatterns = [
    path('', get_routes),
    path('products', get_products),
    path('products/<str:_id>', get_product)
]

# In case user enters a route that does not exist, return error 404
urlpatterns += [path('<route>', error_404)]

