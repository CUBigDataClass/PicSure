from django.db import models


class Image(models.Model):
    """ Model for storing image hashes. The actual image is not stored in the database, only the hashes.
    """

    # SHA512 hashes can be represented as 128 length hex string. While it would be more efficient to store this as raw
    # bytes, it is much easier to work with in this format.
    image_hash = models.CharField(max_length=128)

    def __str__(self):
        return f'Image #{self.id}'
