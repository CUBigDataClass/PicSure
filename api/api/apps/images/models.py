from django.db import models


class Camera(models.Model):
    key = models.CharField(max_length=512)

    def __str__(self):
        return f'Camera #{self.id}'


class Image(models.Model):
    camera = models.ForeignKey(Camera, on_delete=models.CASCADE)
    image_hash = models.CharField(max_length=512)

    def __str__(self):
        return f'Image From Camera #{self.camera.id}'
