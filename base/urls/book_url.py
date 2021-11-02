from django.urls import path
from base.views import book_views as views

urlpatterns = [
    path('', views.getBooks, name='all-books'),
]
