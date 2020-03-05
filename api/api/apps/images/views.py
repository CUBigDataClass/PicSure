import json

from json import JSONDecodeError

from django.http import HttpResponse
from django.views.generic import View

from api.settings import CAMERA_PASSWORD
from api.apps.images.models import Image


class ImageView(View):
    """ View for uploading images to and checking images against the database. Uploading requires a camera password,
        which only the cameras possess.

        To upload an image, a JSON object must be posted to this view in the following format:
        {
            'hash': <hash of the image to upload>,
            'password': <camera password>
        }

        To check an image, a JSON object must be get to this view in the following format:
        {
            'hash': <hash of the image to check>
        }

        Note that the original image does not need to be sent to be uploaded or checked.
    """

    def get(self, request, *args, **kwargs):
        try:
            data = request.GET
        except JSONDecodeError:
            return HttpResponse(status=400)

        # Check if the user failed to specify any required data.
        if any(key not in data for key in ['hash']):
            return HttpResponse(status=400)

        # Check if the hash exists in the database.
        is_valid = Image.objects.filter(image_hash=data['hash']).count() > 0

        if is_valid:
            return HttpResponse(status=200)

        return HttpResponse(status=204)

    def post(self, request, *args, **kwargs):
        try:
            data = json.loads(request.body)
        except JSONDecodeError:
            return HttpResponse(status=400)

        # Check if the user failed to specify any required data.
        if any(key not in data for key in ['hash', 'password']):
            return HttpResponse(status=400)

        # Make sure the camera has a valid password. If this check fails, someone is trying to spoof a camera.
        if data['password'] != CAMERA_PASSWORD:
            return HttpResponse(status=401)

        # Save the image hash to the database.
        image_object = Image()
        image_object.image_hash = data['hash']
        image_object.save()

        return HttpResponse(status=200)
