
from rest_framework import serializers
from base.filters import BookFilter
from base.models import Books
from base.serializers import BookSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response



@api_view(['GET'])
def getBooks(request):
  books = Books.objects.all()
  bookFilter = BookFilter(request.GET, queryset=books)
  books = bookFilter.qs
  serializer = BookSerializer(books, many=True)
  return Response(serializer.data)