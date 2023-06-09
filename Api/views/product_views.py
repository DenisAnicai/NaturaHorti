from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist

from Api.models import Product, Review
from Api.serializers import ProductSerializer, ReviewSerializer

from rest_framework import status


@api_view(['GET'])
@permission_classes([AllowAny])
def get_products(request):
    try:
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response({'detail': 'Eroare la recuperarea produselor'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_product(request, _id):
    try:
        product = Product.objects.get(_id=_id)
        serializer = ProductSerializer(product, many=False)
        return Response(serializer.data)
    except ObjectDoesNotExist:
        return Response({'detail': 'Produsul nu a fost găsit'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'detail': 'Eroare la recuperarea produsului'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_product_review(request, _id):
    user = request.user
    data = request.data
    try:
        if not data:
            return Response({'detail': 'Lipsa date'}, status=status.HTTP_400_BAD_REQUEST)
        if not data['rating']:
            return Response({'detail': 'Completați toate câmpurile'}, status=status.HTTP_400_BAD_REQUEST)

        if not user:
            return Response({'detail': 'Trebuie să fiți logat pentru a adăuga un review'}, status=status.HTTP_401_UNAUTHORIZED)
        product = Product.objects.get(_id=_id)
        # 1 - Review already exists
        already_exists = product.review_set.filter(user=user).exists()
        if already_exists:
            return Response({'detail': 'Produsul a fost deja recenzat'}, status=status.HTTP_400_BAD_REQUEST)
        # 2 - No rating or 0
        elif data['rating'] == 0:
            return Response({'detail': 'Selecteaza un rating'}, status=status.HTTP_400_BAD_REQUEST)
        # 3 - Create review
        else:
            review = Review.objects.create(
                user=user,
                product=product,
                name=user.first_name if user.first_name else 'Anonim',
                rating=data['rating'],
                comment=data.get('comment', '')
            )
            reviews = product.review_set.all()
            product.num_reviews = len(reviews)
            total = 0
            for i in reviews:
                total += i.rating
            product.rating = total / len(reviews)
            product.save()
            return Response('Review adaugat')
    except ObjectDoesNotExist:
        return Response({'detail': 'Produsul nu a fost gasit'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'detail': 'Eroare la adaugarea review-ului'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_product_reviews(request, _id):
    try:
        product = Product.objects.get(_id=_id)
        reviews = product.review_set.all()
        return Response(ReviewSerializer(reviews, many=True).data)
    except ObjectDoesNotExist:
        return Response({'detail': 'Produsul nu a fost gasit'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'detail': 'Eroare la cautarea review-urilor'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
