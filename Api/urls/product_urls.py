from django.urls import path
from Api.views.product_views import get_products, get_product

urlpatterns = [
    path('', get_products, name='products'),
    path('<str:_id>', get_product, name='product'),
]