from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from .views import home

urlpatterns = [
    path('', home, name='home'),
    path('admin/', admin.site.urls),
    path('api/', include('projects.urls')),
    path('api/', include('testimonials.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)