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
from base.filters import StudentFilter, UserFilter
from base.serializers import CollectedBookSerializer, StudentBookSerializer, StudentSerializer, UserBookSerializer, UserSerializer, UserSerializerWithToken
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from tablib import Dataset
import pandas as pd


from base.models import Books, CollectedBooks, NewUser, Student

@api_view(['POST'])
def simple_upload(request):
  new_student = request.FILES['students']
  if not new_student.name.endswith('xlsx'):
      message = {'detail':'wrong format'}
      return Response(message,status=status.HTTP_406_NOT_ACCEPTABLE)
  df = pd.read_excel(new_student)
  for NAME, ADMISSION_NUM, CLASS_DETAIL, PHONE in zip(df.name,df.admission_num, df.class_detail, df.phone):
        models= Student(name=NAME, admission_num=ADMISSION_NUM, class_detail=CLASS_DETAIL, phone=PHONE)
        models.save()
  message = {'detail':'successfully saved data'}
  return Response(message,status=status.HTTP_200_OK)
@api_view(['GET'])
def getStudents(request):
  students = Student.objects.all()
  studentFilter = StudentFilter(request.GET, queryset=students)
  page = request.query_params.get('page')
  print(page)
  students = studentFilter.qs
  paginator = Paginator(students, 8)
  try:
    students = paginator.page(page)
  except PageNotAnInteger:
    students = paginator.page(1)
  except EmptyPage:
    students = paginator.page(paginator.num_pages)
  if page == None:
    page = 1
  page = int(page)
  serializer = StudentSerializer(students, many=True)
  return Response({'students':serializer.data, 'page':page, 'pages':paginator.num_pages})

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
  try:
    student = Student.objects.create(
      name = data['name'],
      admission_num = data['admission_num'],
      class_detail = data['class_detail'],
      phone=data['phone']
    )
    serializer = StudentSerializer(student, many=False)
    
    return Response(serializer.data)
  except:
    message = {'detail':'User with this email or username already exist'}
    return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def getStudentByID(request, pk):
  student = Student.objects.get(admission_num=pk)
  serializer = StudentBookSerializer(student, many=False)
  return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateStudentProfile(request, pk):
  student= Student.objects.get(admission_num=pk)
  print(student)
  serializer = StudentSerializer(student, many=False)
  data = request.data
  student.name = data['name']
  student.class_detail = data['class_detail']
  student.phone = data['phone']
  student.admission_num = data['admission_num']
  student.save()
  return Response(serializer.data)
