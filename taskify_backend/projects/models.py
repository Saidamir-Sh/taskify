from boards.models import Board
from django.db import models
from django.contrib.contenttypes.fields import GenericRelation
from django.utils import timezone
from users.models import User

class Project(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='owner_project')
    title = models.CharField(max_length=255, blank=False, null=False)
    description = models.TextField(blank=True, null=False)
    created_at = models.DateTimeField(default=timezone.now)
    members = models.ManyToManyField(User, through="ProjectMembership", through_fields=('project', 'member'))
    boards = GenericRelation(Board, object_id_field="owner_id", content_type_field="owner_model")

    def __str__(self):
        return self.title
    