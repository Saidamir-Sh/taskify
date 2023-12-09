from django.urls import path
from projects.views import ProjectList, ProjectDetail, ProjectMemberList, ProjectMemberDetail,  SendPRojectInvite, AcceptProjectInvite

urlpatterns = [
    path('', ProjectList.as_view()),
    path('<int:pk>/', ProjectDetail.as_view()),
    path('<int:pk>/members/', ProjectMemberList.as_view()),
    path('members/<int:pk>', ProjectDetail.as_view()),
    path('<int:pk>/invite/', SendPRojectInvite.as_view()),
    path('join/<str:token>', AcceptProjectInvite.as_view())
]