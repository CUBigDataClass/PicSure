from django.contrib import admin

from api.apps.images.models import Camera, Image


@admin.register(Camera)
class CameraAdmin(admin.ModelAdmin):
    pass


@admin.register(Image)
class ImageAdmin(admin.ModelAdmin):
    pass
