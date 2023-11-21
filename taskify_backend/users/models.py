from django.apps import app
from django.db import models
from django.contrib.auth.models import AbstractUser, UserManager
from django.contrib.contenttypes.fields import GenericRelation
from django.contrib.contenttypes.models import ContentType
from django.core.validators import RegexValidator

class CustomUserManager(UserManager):
    def get_by_natural_key(self, username):
        case_insensitive_username_field = '{}__iexact'.format(
            self.model.USERNAME_FIELD
        )
        return self.get(**{case_insensitive_username_field: username})
    
    def filter(self, **kwargs):
        if 'email' in kwargs:
            kwargs['email__iexact'] = kwargs['email']
            del kwargs['email']

        if 'username' in kwargs:
            kwargs['username__iexact'] = kwargs['username']
            del kwargs['username']

        return super(CustomUserManager, self).filter(**kwargs)
    
    def get(self, **kwargs):
        if 'email' in kwargs:
            kwargs['email__iexact'] = kwargs['email']
            del kwargs['email']
        
        if 'username' in kwargs:
            kwargs['username__iexact'] = kwargs['username']
            del kwargs['username']

        return super(CustomUserManager, self).get(**kwargs)
    
username_validator = RegexValidator( r'^[a-zA-Z0-9_\.]*$', 'Only alphanumberic characters, underscores, and periods are allowed in your username.')

class User(AbstractUser):
    username = models.CharField(
        max_length=15, blank=False, null=False, unique=True, validators=[username_validator]  
    )
    email = models.EmailField(
        max_length=255, blank=False, null=False, unique=True
    )
    first_name = models.CharField(max_length=255, blank=False, null=False)
    last_name = models.CharField(max_length=255, blank=False, null=False)
    profile_pic = models.ImageField(blank=True, upload_to='profile_pic')

    # TODO complete after creating boards modal

    # boards = GenericRelation()
    # starred_boards = models.ManyToManyField

    objects = CustomUserManager()

    @property
    def full_name(self):
        return f'{self.first_name} {self.last_name}'
    
    # TODO implement after creating Board and Project Modal
    # def can_view_board(self, board):