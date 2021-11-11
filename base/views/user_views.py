from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from django.contrib.auth.hashers import make_password
from rest_framework.response import Response
from rest_framework import serializers, status
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from base.email import send_reset_password_email
import random
import string
from base.filters import UserFilter
from base.serializers import UserBookSerializer, UserSerializer, UserSerializerWithToken
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger


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
  serializer = UserBookSerializer(user, many=False)
  return Response(serializer.data)

@api_view(['GET'])
def getUsers(request):
  users = NewUser.objects.filter(is_staff=False)
  userFilter = UserFilter(request.GET, queryset=users)
  page = request.query_params.get('page')
  print(page)
  users = userFilter.qs
  paginator = Paginator(users, 8)
  try:
    users = paginator.page(page)
  except PageNotAnInteger:
    users = paginator.page(1)
  except EmptyPage:
    users = paginator.page(paginator.num_pages)
  if page == None:
    page = 1
  page = int(page)
  serializer = UserSerializer(users, many=True)
  return Response({'users':serializer.data, 'page':page, 'pages':paginator.num_pages})

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

def generatePassword():
  lower = string.ascii_lowercase
  upper = string.ascii_uppercase
  num = string.digits
  all = lower + upper + num
  temp = random.sample(all, 6)
  password = "".join(temp)
  return password

@api_view(['POST'])
def forgotPassword(request):
  password = generatePassword()
  email = request.data['email']
  try:
    user = NewUser.objects.get(email=email)
    user.password = make_password(password)
    user.save()
    send_reset_password_email(user.user_name, user.email, password) 
    message = {'detail':'Your new password has been sent your email'}
    return Response(message, status=status.HTTP_200_OK )
  except:
    message = {'detail':'User does not exist'}
    return Response(message, status=status.HTTP_400_BAD_REQUEST )
    

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

@api_view(['POST'])
def registerStudent(request):
  data=request.data
  passwordGen = generatePassword()
  try:
    user = NewUser.objects.create(
      user_name = data['username'],
      email = data['email'],
      password = make_password(passwordGen)
    )
    serializer = UserSerializerWithToken(user, many=False)
    
    return Response(serializer.data)
  except:
    message = {'detail':'User with this email or username already exist'}
    return Response(message, status=status.HTTP_400_BAD_REQUEST)
