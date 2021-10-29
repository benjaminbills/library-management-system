from django.urls import path
from base.views import user_views as views

urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('forgotPassword/', views.forgotPassword, name='forgotPassword'),
    path('register/', views.registerUser, name='registerUser'),
    path('<str:pk>/', views.getUserByID, name='getUserById'),
    path('profile/update/', views.updateUserProfile, name='updateUserProfile'),
    path('delete/<str:pk>/', views.deleteUser, name='deleteUser')
]
