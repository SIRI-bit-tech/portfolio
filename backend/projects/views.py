# projects/views.py

from rest_framework import generics
from .models import Project
from .serializers import ProjectSerializer, ProjectDetailSerializer

class ProjectList(generics.ListAPIView):
    serializer_class = ProjectSerializer

    def get_queryset(self):
        featured = self.request.query_params.get('featured', None)
        if featured is not None:
            return Project.objects.filter(featured=True)
        return Project.objects.all()

class ProjectDetail(generics.RetrieveAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectDetailSerializer
    lookup_field = 'slug'