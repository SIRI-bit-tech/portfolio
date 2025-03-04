# projects/urls.py

from django.urls import path
from .views import ProjectList, ProjectDetail

urlpatterns = [
    path('projects/', ProjectList.as_view(), name='project-list'),
    path('projects/<slug:slug>/', ProjectDetail.as_view(), name='project-detail'),
]