from django.db import models


class Image(models.Model):
    image_hash = models.CharField(max_length=128)

    def __str__(self):
        return f'Image #{self.id}'
