import random

from django.db import models
from django.contrib.auth.models import User


# Create your models here.

def generate_unique_id() -> str:
    """
    Generates a unique id that's 1 more than the last id.

    :return: str
    """

    last_id = Product.objects.all().order_by('_id').last()._id
    if not last_id:
        return '0000001'
    last_id = last_id
    new_id = int(last_id) + 1
    new_id = str(new_id).zfill(7)
    return new_id


class Product(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField(null=True, blank=True)
    category = models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    rating = models.DecimalField(max_digits=7, decimal_places=2, default=0)
    numReviews = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    countInStock = models.IntegerField(null=True, blank=True, default=0)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False, default=generate_unique_id)

    def __str__(self):
        return str(self.name)



class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    rating = models.IntegerField(default=5)
    comment = models.TextField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False, default=generate_unique_id)

    def __str__(self):
        return str(self.rating)

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    paymentMethod = models.CharField(max_length=200)
    taxPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    shippingPrice = models.DecimalField(max_digits=7, decimal_places=2)
    totalPrice = models.DecimalField(max_digits=7, decimal_places=2)
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(auto_now_add=False)
    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(auto_now_add=False)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False, default=generate_unique_id)

    def __str__(self):
        return str(self.createdAt)

class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    qty = models.IntegerField(default=0)
    price = models.DecimalField(max_digits=7, decimal_places=2)
    image = models.CharField(max_length=200, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False, default=generate_unique_id)

    def __str__(self):
        return str(self.name)


class ShippingAddress(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE, null=True, blank=True)
    address = models.CharField(max_length=200)
    city = models.CharField(max_length=200)
    postalCode = models.CharField(max_length=200)
    country = models.CharField(max_length=200)
    shippingPrice = models.DecimalField(max_digits=7, decimal_places=2)
    _id = models.AutoField(primary_key=True, editable=False, default=generate_unique_id)

    def __str__(self):
        return str(self.address)



