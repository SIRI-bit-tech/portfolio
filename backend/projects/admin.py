# projects/admin.py

from django.contrib import admin
from .models import Project, ProjectTag, Language

class ProjectTagInline(admin.TabularInline):
    model = ProjectTag
    extra = 1

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'featured', 'created_at')
    list_filter = ('featured', 'languages', 'tags__name')
    search_fields = ('title', 'description')
    prepopulated_fields = {'slug': ('title',)}
    inlines = [ProjectTagInline]
    filter_horizontal = ('languages',)

@admin.register(Language)
class LanguageAdmin(admin.ModelAdmin):
    list_display = ('name',)

admin.site.register(ProjectTag)