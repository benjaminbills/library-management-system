
from django.db.models.fields import DateField
from rest_framework import serializers
from base.filters import BookFilter
from base.models import Books
from datetime import date
from base.serializers import BookSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger



@api_view(['GET'])
def getBooks(request):
  books = Books.objects.all()
  bookFilter = BookFilter(request.GET, queryset=books)
  page = request.query_params.get('page')
  books = bookFilter.qs
  paginator = Paginator(books, 20)
  try:
    books = paginator.page('')
  except PageNotAnInteger:
    books = paginator.page(1)
  except EmptyPage:
    books = paginator.page(paginator.num_pages)
  if page == None:
    page == 1
  page = int(page)
  serializer = BookSerializer(books, many=True)
  return Response({'books':serializer.data, 'page':page, 'pages':paginator.num_pages})

@api_view(['POST'])
def addBook(request):
  user = request.user
  book = Books.objects.create(
    user=user,
    title='sample title',
    author='John Doe',
    num_of_book=1,
    published = date.today()
  )
  serializer = BookSerializer(book, many=False)
  return Response(serializer.data)
