
from django.db.models.fields import DateField
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework import serializers, status
from base.filters import BookFilter
from base.models import Books, CollectedBooks, NewUser, Student
from datetime import date, datetime
from base.serializers import BookSerializer, CollectedBookSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
import pandas as pd



@api_view(['GET'])
def getBooks(request):
  books = Books.objects.all()
  bookFilter = BookFilter(request.GET, queryset=books)
  page = request.query_params.get('page')
  books = bookFilter.qs
  paginator = Paginator(books, 10)
  try:
    books = paginator.page(page)
  except PageNotAnInteger:
    books = paginator.page(1)
  except EmptyPage:
    books = paginator.page(paginator.num_pages)
  if page == None:
    page = 1
  page = int(page)
  serializer = BookSerializer(books, many=True)
  return Response({'books':serializer.data, 'page':page, 'pages':paginator.num_pages})

@api_view(['POST'])
@permission_classes([IsAdminUser])
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

@api_view(['GET'])
def getBook(request, pk):
  book = Books.objects.get(id=pk)
  serializer = BookSerializer(book, many=False)
  return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateBook(request, pk):
  book = Books.objects.get(id=pk)
  data = request.data
  book.title = data['title']
  book.author = data['author']
  book.published = data['published']
  book.num_of_book = data['num_of_book']
  book.subject = data['subject']
  book.save()
  serializer = BookSerializer(book, many=False)
  return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteBook(request, pk):
  book = Books.objects.get(id=pk)
  book.delete()
  return Response('book was deleted successfully')

@api_view(['POST'])
@permission_classes([IsAdminUser])
def collectBook(request, pk):
  student = Student.objects.get(admission_num=pk)
  data=request.data
  book = Books.objects.get(id=data['bookId'])
  
  if book.num_of_book >= 1:
      collectedBook = CollectedBooks.objects.create(
        student = student,
        book = book
      )
      book.num_of_book -= 1
      book.save()
      serializer = CollectedBookSerializer(collectedBook, many=False)
    
      return Response(serializer.data)
  else:
    return Response({'detail':'Book is not available'}, status=status.HTTP_404_NOT_FOUND)
    

@api_view(['GET'])
def collectBookByUserId(request, pk):
  user = NewUser.objects.get(id=pk)
  collectedBookByUser = CollectedBooks.objects.filter(
    user = user
  )
  serializer = CollectedBookSerializer(collectedBookByUser, many=True)
  return Response(serializer.data)

@api_view(['PUT'])
# @permission_classes([IsAdminUser])
def returnBook(request, pk):
  book = CollectedBooks.objects.get(id=pk)
  bookUpdate = Books.objects.get(id=book.book.id)
  if book.isReturned == False:
    book.isReturned = True
    book.returnedOn = datetime.now()
    bookUpdate.num_of_book += 1
    bookUpdate.save()
    book.save()
    print(book.isReturned)
    return Response({'detail':'Book returned'})
  else:
    return Response({'detail':'Book already returned'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def bookHistory(request, pk):
  book = Books.objects.get(id=pk)
  historyOfBook = CollectedBooks.objects.filter(book=book)
  serializer = CollectedBookSerializer(historyOfBook, many=True)
  return Response(serializer.data)

@api_view(['GET'])
def collectedBooks(request):
  collectedBooks = CollectedBooks.objects.all()
  serializer = CollectedBookSerializer(collectedBooks, many=True)
  return Response(serializer.data)

@api_view(['POST'])
def uploadBooks(request):
  books = request.FILES['books']
  if not books.name.endswith('xlsx'):
    message = {'detail':'wrong format please upload excel file(.xlsx)'}
    return Response(message,status=status.HTTP_406_NOT_ACCEPTABLE)
  df = pd.read_excel(books)
  for USER, TITLE, AUTHOR, SUBJECT, PUBLISHED in zip(df.user,df.title, df.author, df.subject, df.published):
    userDb = NewUser.objects.get(pk=USER)
    models= Books(user=userDb, title=TITLE, author=AUTHOR, subject=SUBJECT, published=PUBLISHED)
    models.save()
  message = {'detail':'successfully saved data'}
  return Response(message,status=status.HTTP_200_OK)