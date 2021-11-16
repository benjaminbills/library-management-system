from django.urls import path
from base.views import student_views as views

urlpatterns = [
    path('', views.getStudents, name='upload_data'),
    path('upload-excel/', views.simple_upload, name='upload_data'),
    path('register/', views.registerStudent, name='registerUser'),
    path('<str:pk>/', views.getStudentByID, name='getStudent'),
    path('profile/update/<str:pk>/', views.updateStudentProfile, name='updateStudentProfile'),
]
