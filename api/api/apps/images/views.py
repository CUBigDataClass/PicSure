import json

from django.http import HttpResponse
from django.views.generic import View

from api.settings import CAMERA_PASSWORD
from api.apps.images.models import Image


class UploadView(View):
    """ View for uploading images to the database. Requires a camera password, which only the cameras possess.

        To upload an image, a JSON object must be posted to this view in the following format:
        {
            'hash': <hash of the image to upload>,
            'password': <camera password>
        }

        Note that the original image does not need to be sent to be uploaded.
    """

    def post(self, request, *args, **kwargs):
        data = json.loads(request.body)

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
