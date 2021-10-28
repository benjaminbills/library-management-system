from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from django.contrib.auth.hashers import make_password
from rest_framework.response import Response
from rest_framework import serializers, status
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from base.serializers import UserSerializer, UserSerializerWithToken


from base.models import NewUser

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
  def validate(self, attrs):
      data = super().validate(attrs)

      serializer = UserSerializerWithToken(self.user).data

      for k, v in serializer.items():
        data[k] = v

      return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
def registerUser(request):
  data=request.data
  try:
    user = NewUser.objects.create(
      user_name = data['username'],
      email = data['email'],
      password = make_password(data['password'])
    )
    serializer = UserSerializerWithToken(user, many=False)
    
    return Response(serializer.data)
  except:
    message = {'detail':'User with this email or username already exist'}
    return Response(message, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserByID(request, pk):
  user = NewUser.objects.get(id=pk)
  serializer = UserSerializer(user, many=False)
  return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
  user= request.user
  serializer = UserSerializerWithToken(user, many=False)
  data = request.data
  user.user_name = data['username']
  user.about = data['about']
  if data['password'] != '':
    user.password = make_password(data['password'])
  user.save()
  return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteUser(request, pk):
  try:
    user = NewUser.objects.get(id=pk)
    user.delete()
    return Response('User was deleted successfully')
  except:
    message = {'detail':'User does not exist'}
    return Response(message, status=status.HTTP_400_BAD_REQUEST )