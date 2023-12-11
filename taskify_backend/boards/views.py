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
from projects.permissions import IsProjectAdminOrMemberReadOnly, IsProjectMember
from projects.models import Project, ProjectMembership

r = redis.Redis(
    host=settings.REDIS_HOST, port=settings.REDIS_PORT, db=settings.REDIS_DB,
    charset="utf-8", decode_responses=True
)

class BoardList(generics.ListCreateAPIView):
    serializer_class = ShortBoardSerializer
    permission_classes = [IsProjectMember]

    def get_project(self, pk):
        project = get_object_or_404(Project, pk=pk)
        self.check_object_permissions(self.request, project)
        return project
    
    def get_queryset(self, *args, **kwargs):
        project_id = self.request.GET.get('project', None)
        sort = self.request.GET.get('sort', None)
        search = self.request.GET.get('q', None)

        if sort == "recent":
            redis_key = f'{self.request.user.username}:RecentlyViewedBoards'
            board_ids = r.zrange(redis_key, 0, 3, desc=True)
            preserved = Case(*[When(pk=pk, then=pos) for pos, pk in enumerate(board_ids)])
            
            return Board.objects.filter(pk__in=board_ids).order_by(preserved)
        
        if project_id is None:
            project_ids = ProjectMembership.objects.filter(
                member=self.request.user).values_list('project__id', flat=True)
            queryset = Board.objects.filter(Q(owner_id=self.request.user.id, owner_model=ContentType.objects.get(model='user')) | \
                                            Q(owner_id__in=project_ids, owner_model=ContentType.objects.get(model='project')))
        else:
            queryset = Board.objects.filter(
                owner_id=project_id, owner_model=ContentType.objects.get(model='project'))
            project = self.get_object(project_id)

        if search is not None:
            return queryset.filter(title__contains=search)[:2]
        return queryset
    
    def post(self, request, *args, **kwargs):
        serializer = ShortBoardSerializer(
            data=request.data, context={"request": request})
        
        if serializer.is_valid():
            if 'project' in request.data.keys():
                project = self.get_project(request.data['project'])
                serializer.save(
                    owner_id=project.id, owner_model=ContentType.objects.get(model='project'))
            else:
                serializer.save(owner_id=request.user.id, owner_model=ContentType.objects.get(model='user'))
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
