from django.contrib import admin
from .models import Board, List, Item, Label, Comment, Attachment, Notification

# TODO improve this to @admin.register class
admin.site.register(Board)
admin.site.register(List)
admin.site.register(Item)
admin.site.register(Label)
admin.site.register(Comment)
admin.site.register(Attachment)
admin.site.register(Notification)