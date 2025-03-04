from django.contrib import admin
from .models import Testimonial

@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('name', 'position', 'is_active', 'created_at')
    list_filter = ('is_active',)
    search_fields = ('name', 'position', 'text')
    list_editable = ('is_active',)

