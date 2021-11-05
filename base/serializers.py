from django.db import models
from django.db.models import fields
from rest_framework import serializers
from base.models import Books, NewUser, CollectedBooks
from rest_framework_simplejwt.tokens import RefreshToken

class UserSerializer(serializers.ModelSerializer):
  user_name=serializers.SerializerMethodField(read_only=True)
  id=serializers.SerializerMethodField(read_only=True)
  isAdmin=serializers.SerializerMethodField(read_only=True)
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
    fields = '__all__'

class CollectedBookSerializer(serializers.ModelSerializer):
  user = serializers.SerializerMethodField(read_only=True)
  book = serializers.SerializerMethodField(read_only=True)
  class Meta:
    model = CollectedBooks
    fields = '__all__'
  def get_user(self, obj):
    user = obj.user
    serializer = UserSerializer(user, many=False)
    return serializer.data
  def get_book(self, obj):
    book = obj.book
    serializer = BookSerializer(book, many=False )
    return serializer.data