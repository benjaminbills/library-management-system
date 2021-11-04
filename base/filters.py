from django.db.models import fields
from .models import Books
import django_filters
from django_filters import CharFilter

class BookFilter(django_filters.FilterSet):
  title = CharFilter(field_name='title', lookup_expr='icontains')
  author= CharFilter(field_name='author', lookup_expr='icontains')
  class Meta:
    model = Books
    fields = 'title', 'author'

class UserFilter(django_filters.FilterSet):
  id = CharFilter(field_name='id', lookup_expr='icontains')
  user_name= CharFilter(field_name='user_name', lookup_expr='icontains')
  email= CharFilter(field_name='email', lookup_expr='icontains')
  class Meta:
    model = Books
    fields = 'title', 'author'
