from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist

from Api.models import Product
from Api.serializers import ProductSerializer

from rest_framework import status


@api_view(['GET'])
@permission_classes([AllowAny])
def get_products(request):
    try:
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response({'detail': 'Error retrieving products'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_product(request, _id):
    try:
        product = Product.objects.get(_id=_id)
        serializer = ProductSerializer(product, many=False)
        return Response(serializer.data)
    except ObjectDoesNotExist:
        return Response({'detail': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'detail': 'Error retrieving product'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
