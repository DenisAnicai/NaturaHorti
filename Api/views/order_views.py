from datetime import datetime

from django.core.paginator import PageNotAnInteger, EmptyPage, Paginator
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.response import Response

from Api.models import Order, OrderItem, ShippingAddress, Product, OrderPersonalDetails
from Api.serializers import OrderSerializer

from rest_framework import status
from rest_framework.exceptions import ParseError
from django.core.exceptions import ValidationError
from django.db import transaction


@api_view(['POST'])
@permission_classes([AllowAny])
def add_order_items(request):
    data = request.data
    orderItems = data['orderItems']

    if orderItems and len(orderItems) == 0:
        return Response({'detail': 'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        try:
            with transaction.atomic():  # Start of transaction
                user = request.user if request.user.is_authenticated else None

                # Create an orderPersonalDetails object if user is authenticated and orderPersonalDetails doesn't already exist in the database
                # or if user is not authenticated
                if user:
                    if not OrderPersonalDetails.objects.filter(user=user).exists():
                        orderPersonalDetails = OrderPersonalDetails.objects.create(
                            user=user,
                            name=data['personalDetails']['name'],
                            email=data['personalDetails']['email'],
                            phone=data['personalDetails']['phone'],
                        )
                    else:
                        orderPersonalDetails = OrderPersonalDetails.objects.get(user=user)
                else:
                    orderPersonalDetails = OrderPersonalDetails.objects.create(
                        name=data['personalDetails']['name'],
                        email=data['personalDetails']['email'],
                        phone=data['personalDetails']['phone'],
                    )

                # (1) Create order
                order = Order.objects.create(
                    user=user,
                    orderPersonalDetails=orderPersonalDetails,
                    paymentMethod=data['paymentMethod'],
                    taxPrice=data['vatPrice'],
                    shippingPrice=data['shippingPrice'],
                    totalPrice=data['totalPrice'],
                )

                # (2) Create shipping address
                shipping = ShippingAddress.objects.create(
                    order=order,
                    address=data['shippingAddress']['address'],
                    city=data['shippingAddress']['city'],
                    postalCode=data['shippingAddress']['postalCode'],
                    country=data['shippingAddress']['country'],
                    shippingPrice=data['shippingPrice'],
                )

                # (3) Create order items and set order to orderItem relationship
                for i in orderItems:
                    product = Product.objects.get(_id=i['product'])
                    item = OrderItem.objects.create(
                        product=product,
                        order=order,
                        name=product.name,
                        qty=i['qty'],
                        price=i['price'],
                        image=product.image.url,
                    )

                    # (4) Update product stock
                    if product.countInStock < item.qty:
                        raise ValidationError('Not enough items in stock')

                    product.countInStock -= item.qty
                    product.save()

                serializer = OrderSerializer(order, many=False)
                return Response(serializer.data)
        except ValidationError as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'detail': 'Error in order processing'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_orders(request):
    user = request.user
    orders = Order.objects.filter(user=user).order_by('-createdAt')

    limit = request.query_params.get('limit')
    page = request.query_params.get('page')

    if not limit or not page:
        raise ParseError("Page and limit parameters are required")

    # Pagination
    paginator = Paginator(orders, limit)
    try:
        orders = paginator.page(page)
    except PageNotAnInteger:
        raise ParseError("Page parameter must be an integer")
    except EmptyPage:
        orders = paginator.page(paginator.num_pages)

    serializer = OrderSerializer(orders, many=True)
    return Response({
        'orders': serializer.data,
        'hasMoreOrders': paginator.num_pages > int(page)
    })


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_order_to_paid(request, pk):
    order = Order.objects.get(_id=pk)

    order.isPaid = True
    order.paidAt = datetime.now()
    order.save()

    return Response('Comanda a fost platita')