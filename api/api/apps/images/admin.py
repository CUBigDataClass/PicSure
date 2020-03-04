from django.contrib import admin

from api.apps.images.models import Image


@admin.register(Image)
class ImageAdmin(admin.ModelAdmin):
    pass
