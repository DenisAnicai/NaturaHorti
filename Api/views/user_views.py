from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.response import Response
from django.contrib.auth.password_validation import validate_password
from rest_framework import status

from django.core.exceptions import ValidationError, ObjectDoesNotExist
from django.db import IntegrityError

from Api.models import User
from Api.serializers import UserSerializer, UserSerializerWithToken

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth.hashers import make_password
from rest_framework import status


@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    data = request.data
    try:
        user = User.objects.create(
            first_name=data['name'],
            username=data['email'],
            email=data['email'],
            password=make_password(data['password'])
        )
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except IntegrityError:
        message = {'detail': 'Exista deja un utilizator cu acest email'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    except ValidationError as e:
        return Response(e.messages, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        message = {'detail': f'Ceva nu a mers bine. Incearca din nou mai tarziu. {e}'}
        return Response(message, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_user_profile(request):
    user = request.user
    serializer = UserSerializerWithToken(user, many=False)
    data = request.data
    try:
        user.first_name = data['name']
        user.username = data['email']
        user.email = data['email']

        password = data['password']
        try:
            validate_password(password, user=user)
        except Exception as e:
            return Response({'password': e.messages}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(password)
        user.save()
        return Response(serializer.data)
    except KeyError:
        return Response({'detail': 'Required fields are missing'}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        message = {'detail': f'Ceva nu a mers bine. Incearca din nou mai tarziu. {e}'}
        return Response(message, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_users(request):
    try:
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response({'detail': 'Error retrieving users'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    try:
        user = request.user
        serializer = UserSerializer(user, many=False)
        return Response(serializer.data)
    except ObjectDoesNotExist:
        return Response({'detail': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'detail': 'Error retrieving user'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Custom serializer for the TokenObtainPairView.
    """

    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
