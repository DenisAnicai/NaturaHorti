from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.response import Response

from rest_framework import status
@api_view(['GET', 'POST', 'DELETE', 'PUT', 'PATCH'])
@permission_classes([AllowAny])
def error_404(request, route):
    return Response(f'Error: api/{route} route not found (404)', status=status.HTTP_404_NOT_FOUND)
