from django.contrib.contenttypes.models import ContentType
from django.core.exceptions import MultipleObjectsReturned, ObjectDoesNotExist
from django.urls import Resolver404
from django.urls.base import resolve, reverse
from django.utils.module_loading import import_string
# from project.models import Project
from rest_framework import serializers
from rest_framework.fields import Field
from users.models import User
from users.serializers import UserSerializer

from .models import Attachment, Board, Comment, Item, Label, List, Notification