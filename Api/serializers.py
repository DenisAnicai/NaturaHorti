from rest_framework import serializers

from rest_framework_simplejwt.serializers import RefreshToken
from .models import Product, Review, Order, OrderItem, ShippingAddress, User, OrderPersonalDetails


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'


class OrderPersonalDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderPersonalDetails
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    items = serializers.SerializerMethodField(read_only=True)
    shippingAddress = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)
    orderPersonalDetails = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = '__all__'

    def get_items(self, obj):
        items = obj.orderitem_set.all()
        serializer = OrderItemSerializer(items, many=True)
        return serializer.data

    def get_shippingAddress(self, obj):
        try:
            address = ShippingAddressSerializer(obj.shippingaddress, many=False).data
        except:
            address = False
        return address

    def get_user(self, obj):
        try:
            user = UserSerializer(obj.user, many=False).data
        except:
            user = False

        return user

    def get_orderPersonalDetails(self, obj):
        try:
            print(obj)
            print(obj.orderPersonalDetails)
            orderPersonalDetails = OrderPersonalDetailsSerializer(obj.orderPersonalDetails, many=False).data

        except:
            orderPersonalDetails = False
        return orderPersonalDetails


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'


class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    is_admin = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ('_id', 'username', 'email', 'name', 'is_admin')

    def get__id(self, obj):
        return obj.id

    def get_is_admin(self, obj):
        return obj.is_staff

    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.email
        return name


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ('_id', 'username', 'email', 'name', 'is_admin', 'token')

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)
