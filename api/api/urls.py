from django.contrib import admin
from django.urls import path

from api.apps.images.views import UploadView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('upload/', UploadView.as_view()),
]
