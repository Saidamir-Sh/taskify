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

class LabelSerializer(serializers.ModelSerializer):

    class Meta:
        model = Label
        exclude = ['board']

class CommentSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        exclude = ['list']

class AttachmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Attachment
        fields = '__all__'

class ItemSerializer(serializers.ModelSerializer):
    labels = LabelSerializer(many=True, read_only=True)
    attachments = AttachmentSerializer(many=True, read_only=True)
    assigned_to = serializers.SerializerMethodField()

    class Meta:
        model = Item
        exclude = ['list']

    def get_assigned_to(self, obj):
        queryset = obj.assigned_to.all()
        return UserSerializer(queryset, many=True).data
    
class ListSerializer(serializers.ModelSerializer):
    items = serializers.SerializerMethodField()

    class Meta:
        model = List
        exclude = ['board']
    
    def get_items(self, obj):
        queryset = Item.objects.filter(list=obj).order_by('order')
        return ItemSerializer(queryset, many=True).data
