from django.db.models import fields
from django_filters.filters import NumberFilter
from .models import Books, CollectedBooks, Student
import django_filters
from django_filters import CharFilter

class BookFilter(django_filters.FilterSet):
  title = CharFilter(field_name='title', lookup_expr='icontains')
  author= CharFilter(field_name='author', lookup_expr='icontains')
  subject= CharFilter(field_name='subject', lookup_expr='icontains')
  class Meta:
    model = Books
    fields = 'title', 'author'

class UserFilter(django_filters.FilterSet):
  id = CharFilter(field_name='id', lookup_expr='icontains')
  user_name= CharFilter(field_name='user_name', lookup_expr='icontains')
  email= CharFilter(field_name='email', lookup_expr='icontains')
  class Meta:
    model = Books
    fields = 'user_name', 'email'

class StudentFilter(django_filters.FilterSet):
  name = CharFilter(field_name='name', lookup_expr='icontains')
  admission_num= CharFilter(field_name='admission_num', lookup_expr='icontains')
  class_detail= CharFilter(field_name='class_detail', lookup_expr='icontains')
  phone = NumberFilter(field_name='phone', lookup_expr='icontains')
  class Meta:
    model = Student
    fields = 'name', 'admission_num','class_detail','phone'