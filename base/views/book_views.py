
from django.db.models.fields import DateField
from rest_framework import serializers, status
from base.filters import BookFilter
from base.models import Books, CollectedBooks, NewUser
from datetime import date, datetime
from base.serializers import BookSerializer, CollectedBookSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger



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
def deleteBook(request, pk):
  book = Books.objects.get(id=pk)
  book.delete()
  return Response('book was deleted successfully')

@api_view(['POST'])
def collectBook(request, pk):
  user = NewUser.objects.get(id=pk)
  data=request.data
  book = Books.objects.get(id=data['bookId'])
  
  if book.num_of_book >= 1:
      collectedBook = CollectedBooks.objects.create(
        user = user,
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