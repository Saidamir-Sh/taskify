import redis
from django.shortcuts import render, get_object_or_404
from django.conf import settings
from django.contrib.contenttypes.models import ContentType
from django.db.models import Case, Q, When
from django.utils import timezone
from django.utils.module_loading import import_string
from rest_framework import generics, permissions, serializers, status
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response
from rest_framework.views import APIView
from users.models import User
from .models import Attachment, Board, Comment, Item, Label, List, Notification
from .permissions import CanViewBoard, IsAuthorOrReadOnly
from .serializers import (AttachmentSerializer, BoardSerializer, CommentSerializer, ItemSerializer, LabelSerializer, ListSerializer, NotificationSerializer, ShortBoardSerializer)

r = redis.Redis(
    host=settings.REDIS_HOST, port=settings.REDIS_PORT, db=settings.REDIS_DB,
    charset="utf-8", decode_responses=True
)

class BoardList(generics.ListCreateAPIView):
    serializer_class = ShortBoardSerializer
    # TODO after creating projects app
    # permission_classes = [IsProjectMember]
    