# projects/serializers.py

from rest_framework import serializers
from .models import Project, ProjectTag, Language

class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = ['id', 'name']

class ProjectTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectTag
        fields = ['name']

class ProjectSerializer(serializers.ModelSerializer):
    tags = ProjectTagSerializer(many=True, read_only=True)
    languages = LanguageSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = ['id', 'title', 'slug', 'description', 'image', 'github_url', 'live_url', 'created_at', 'featured', 'tags', 'languages']

class ProjectDetailSerializer(ProjectSerializer):
    class Meta(ProjectSerializer.Meta):
        fields = ProjectSerializer.Meta.fields + ['description']