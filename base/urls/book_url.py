from django.urls import path
from base.views import book_views as views

urlpatterns = [
    path('', views.getBooks, name='all-books'),
    path('add/', views.addBook, name='add-book'),
    path('<str:pk>/', views.getBook, name='get-book'),
    path('collect/<str:pk>/', views.collectBook, name='collect-book'),
    path('collected-by-user/<str:pk>/', views.collectBookByUserId, name='collected-book-user'),
    path('update/<str:pk>/', views.updateBook, name='update-book'),
    path('delete/<str:pk>/', views.deleteBook, name='delete-book'),

]
