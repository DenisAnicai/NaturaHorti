from rest_framework import serializers

from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('_id', 'name', 'image', 'description', 'category', 'price', 'countInStock', 'rating',
                    'numReviews', 'createdAt')

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('_id', 'name', 'rating', 'comment', 'createdAt')

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('_id', 'user', 'paymentMethod', 'taxPrice', 'shippingPrice', 'totalPrice', 'isPaid', 'paidAt',
                    'isDelivered', 'deliveredAt', 'createdAt')

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('_id', 'name', 'qty', 'price', 'image')

class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('_id', 'order', 'address', 'city', 'postalCode', 'country', 'shippingPrice')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('_id', 'name', 'email', 'password', 'isAdmin')
