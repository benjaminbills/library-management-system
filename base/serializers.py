from django.db import models
from django.db.models import fields
from rest_framework import serializers
from base.models import Books, NewUser, CollectedBooks, Student
from rest_framework_simplejwt.tokens import RefreshToken

class UserSerializer(serializers.ModelSerializer):
  user_name=serializers.SerializerMethodField(read_only=True)
  id=serializers.SerializerMethodField(read_only=True)
  isAdmin=serializers.SerializerMethodField(read_only=True)
  # booksCollected = serializers.SerializerMethodField(read_only=True)
  class Meta:
    model = NewUser
    fields = ['id', 'user_name', 'email','isAdmin', 'about']
  def get_id(self, obj):
    return obj.id  
  def get_isAdmin(self, obj):
    return obj.is_staff
  def get_user_name(self, obj):
    user_name = obj.user_name
    if user_name== '':
      user_name = obj.email
    return user_name
  # def get_booksCollected(self, obj):
  #   books = obj.collectedbooks.set_all()
  #   serializers = CollectedBookSerializer(books, many=True)
class UserSerializerWithToken(UserSerializer):
  token = serializers.SerializerMethodField(read_only=True)
  class Meta:
    model = NewUser
    fields = ['id', 'user_name', 'email','isAdmin', 'token' ]
  def get_token(self,obj):
    token = RefreshToken.for_user(obj)
    return str(token.access_token)

class BookSerializer(serializers.ModelSerializer):
  class Meta:
    model = Books
    fields = ['id', 'title', 'author', 'published', 'image', 'num_of_book', 'subject']

class StudentSerializer(serializers.ModelSerializer):
  class Meta:
    model = Student
    fields = '__all__'

class CollectedBookSerializer(serializers.ModelSerializer):
  book = serializers.SerializerMethodField(read_only=True)
  student = serializers.SerializerMethodField(read_only=True)
  class Meta:
    model = CollectedBooks
    fields = '__all__'
  def get_book(self, obj):
    book = obj.book
    serializer = BookSerializer(book, many=False )
    return serializer.data
  def get_student(self, obj):
    student = obj.student
    serializer = StudentSerializer(student, many=False)
    return serializer.data

class UserBookSerializer(serializers.ModelSerializer):
  user_name=serializers.SerializerMethodField(read_only=True)
  id=serializers.SerializerMethodField(read_only=True)
  isAdmin=serializers.SerializerMethodField(read_only=True)
  booksCollected = serializers.SerializerMethodField(read_only=True)
  class Meta:
    model = NewUser
    fields = ['id', 'user_name', 'email','isAdmin', 'about', 'booksCollected']
  def get_id(self, obj):
    return obj.id  
  def get_isAdmin(self, obj):
    return obj.is_staff
  def get_user_name(self, obj):
    user_name = obj.user_name
    if user_name== '':
      user_name = obj.email
    return user_name
  def get_booksCollected(self, obj):
    books = CollectedBooks.objects.filter(
    user_id = obj.id
  )
    serializer = CollectedBookSerializer(books, many=True)
    return serializer.data
  
class StudentBookSerializer(serializers.ModelSerializer):
    id=serializers.SerializerMethodField(read_only=True)
    name=serializers.SerializerMethodField(read_only=True)
    admission_num=serializers.SerializerMethodField(read_only=True)
    class_detail=serializers.SerializerMethodField(read_only=True)
    phone = serializers.SerializerMethodField(read_only=True)
    booksCollected = serializers.SerializerMethodField(read_only=True)
    class Meta:
      model = Student
      fields = ['id','admission_num', 'name', 'class_detail','phone', 'booksCollected']
    def get_id(self, obj):
      return obj.id  
    def get_admission_num(self, obj):
      return obj.admission_num 
    def get_class_detail(self, obj):
      return obj.class_detail 
    def get_phone(self, obj):
      return obj.phone
    def get_name(self, obj):
      return obj.name
    def get_booksCollected(self, obj):
      books = CollectedBooks.objects.filter(
      student_id = obj.id 
    )
      serializer = CollectedBookSerializer(books, many=True)
      return serializer.data