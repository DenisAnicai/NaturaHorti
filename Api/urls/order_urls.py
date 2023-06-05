from django.urls import path
from Api.views.order_views import add_order_items, get_all_orders, update_order_to_paid

urlpatterns = [
    path('add', add_order_items, name='orders-add'),
    path('', get_all_orders, name='orders'),
    path('<str:pk>/pay', update_order_to_paid, name='order-pay'),
    ]