from django.http import JsonResponse
from django.shortcuts import render
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Product
from .serializers import ProductSerializer, ReviewSerializer, OrderSerializer, OrderItemSerializer, ShippingAddressSerializer, UserSerializer


# Create your views here.

@api_view(['GET'])
def get_routes(request):
    routes = [
        '/api/products/',
        '/api/products/create/',
        '/api/products/upload/',
        '/api/products/<id>/reviews/',
        '/api/products/top/',
        '/api/products/<id>/',
        '/api/products/delete/<id>/',
        '/api/products/update/<id>/',
    ]
    return JsonResponse(routes, safe=False)


@api_view(['GET'])
def get_products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_product(request, _id):
    product = Product.objects.get(_id=_id)
    print(product)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

@api_view(['GET', 'POST', 'DELETE', 'PUT', 'PATCH'])
def error_404(request, route):
    return Response(f'Error: api/{route} route not found (404)', status=404)

