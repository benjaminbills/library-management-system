from django.db import models
from django.db.models.fields import IntegerField
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager, User
from django_filters.filters import _truncate

class CustomAccountManager(BaseUserManager):

    def create_superuser(self, email, user_name, first_name, password, **other_fields):

        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_active', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError(
                'Superuser must be assigned to is_staff=True.')
        if other_fields.get('is_superuser') is not True:
            raise ValueError(
                'Superuser must be assigned to is_superuser=True.')

        return self.create_user(email, user_name, first_name, password, **other_fields)

    def create_user(self, email, user_name, first_name, password, **other_fields):

        if not email:
            raise ValueError(_('You must provide an email address'))

        email = self.normalize_email(email)
        user = self.model(email=email, user_name=user_name,
                          first_name=first_name, **other_fields)
        user.set_password(password)
        user.save()
        return user


class NewUser(AbstractBaseUser, PermissionsMixin):

    email = models.EmailField(_('email address'), unique=True)
    user_name = models.CharField(max_length=150, unique=True)
    first_name = models.CharField(max_length=150, blank=True)
    start_date = models.DateTimeField(default=timezone.now)
    about = models.TextField(_(
        'about'), max_length=500, blank=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    objects = CustomAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['user_name', 'first_name']

    def __str__(self):
        return self.user_name

class Books(models.Model):
    user = models.ForeignKey(NewUser, on_delete=models.SET_NULL, null=True )
    title = models.CharField(max_length=500)
    author = models.CharField(max_length=500)
    subject = models.CharField(max_length=50, null=True, blank=True,)
    published = models.DateField()
    image = models.ImageField(null=True, blank=True)
    num_of_book = models.IntegerField(null=True, blank=True, default=0)

class Student(models.Model):
    name = models.CharField(max_length=200)
    admission_num = models.CharField(max_length=100, unique=True)
    class_detail = models.CharField(max_length=100)
    phone = IntegerField(null=True, blank=True, unique=False)

class CollectedBooks(models.Model):
    student = models.ForeignKey(Student, on_delete=models.SET_NULL, null=True )
    book = models.ForeignKey(Books, on_delete=models.SET_NULL, null=True)
    collectedOn = models.DateTimeField(auto_now_add=True)
    returnedOn = models.DateTimeField(null=True, blank=True)
    isReturned = models.BooleanField(default=False)

