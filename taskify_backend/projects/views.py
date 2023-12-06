import uuid
from django.shortcuts import render
import redis
from boards.models import Notification
from django.conf  import settings
from django.contrib.contenttypes.models import ContentType
from django.core.mail import send_mail
from django.db.models import Case, When
from django.http import Http404
from django.shortcuts import get_object_or_404
from projects.models import Project, ProjectMembership
from projects.permissions import IsProjectAdminOrMemberReadOnly
from projects.serializers import ProjectSerializer, ProjectMembershipSerializer, ShortProjectSerializer
from rest_framework import generics, mixins, status
from rest_framework.response import Response
from rest_framework.views import APIView
from users.models import User


class ProjectList(mixins.ListModelMixin, mixins.CreateModelMixin, 
                  generics.GenericAPIView):
    
    def get_serializer_class(self):
        if self.request.method == 'GET':
            return ShortProjectSerializer
        
        return ProjectSerializer
    
    def get_queryset(self):
        project_ids = ProjectMembership.objects.filter(
            member=self.request.user).order_by('-access_level').values_list('project__id', flat=True)
        preserved = Case(*[When(pk=pk, then=pos)
                           for pos, pk in enumerate(project_ids)])
        return Project.objects.filter(pk__in=project_ids).order_by(preserved)
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
    
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
    
