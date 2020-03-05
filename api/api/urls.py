from django.contrib import admin
from django.urls import path

from api.apps.images.views import ImageView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', ImageView.as_view()),
]
