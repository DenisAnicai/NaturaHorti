from django.urls import path
from Api.views.product_views import get_products, get_product, create_product_review, get_product_reviews

urlpatterns = [
    path('', get_products, name='products'),
    path('<str:_id>', get_product, name='product'),
    path('<str:_id>/reviews', get_product_reviews, name='product-reviews'),
    path('<str:_id>/reviews/create', create_product_review, name='create-product-review'),
]