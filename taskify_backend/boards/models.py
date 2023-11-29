from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db.models import Max
from django.utils import timezone
from users.models import User

class Board(models.Model):
    owner_model = models.ForeignKey(ContentType, blank=False, null=False,
                                    related_name='board',
                                    on_delete=models.CASCADE,
                                    limit_choices_to=models.Q(app_label='users', model='user') | models.Q(app_label='projects', model='project'))
    owner_id = models.PositiveIntegerField(null=False, blank=False)
    owner = GenericForeignKey('owner_model', 'owner_id')
    title = models.CharField(max_length=255, blank=False, null=False)
    description = models.TextField(blank=True, null=False)

    image = models.ImageField(upload_to='board_images', blank=True)
    image_url = models.URLField(blank=True, null=False)
    color = models.CharField(max_length=6, blank=True, null=False)

    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.title

class List(models.Model):
    board = models.ForeignKey(Board, on_delete=models.CASCADE, related_name='lists')
    title = models.CharField(max_length=255, blank=False, null=True)
    order = models.DecimalField(max_digits=30, decimal_places=15, blank=False, null=True)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.title
    
class Label(models.Model):
    board = models.ForeignKey(Board, on_delete=models.CASCADE, related_name='labels')
    title = models.CharField(max_length=255, blank=True, null=False)
    color = models.CharField(max_length=6, blank=False, null=False)

    def __str__(self):
        return self.title
    
class Item(models.Model):
    list = models.ForeignKey(List, on_delete=models.CASCADE, related_name='items')
    title = models.CharField(max_length=255, blank=False, null=False)
    description = models.TextField(blank=True, null=False)

    image = models.ImageField(blank=True, upload_to='item_images')
    image_url = models.URLField(blank=True, null=False)
    color = models.CharField(max_length=6, blank=True, null=False)

    order = models.DecimalField(max_digits=30, decimal_places=15, blank=True, null=False)
    labels = models.ManyToManyField(Label, blank=True)
    assigned_to = models.ManyToManyField(User, blank=True)
    due_date = models.DateTimeField(blank=True, null=False)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.title