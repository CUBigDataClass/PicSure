import json

from django.http import HttpResponse
from django.views.generic import View

from api.settings import CAMERA_PASSWORD
from api.apps.images.models import Image


class UploadView(View):

    def post(self, request, *args, **kwargs):
        data = json.loads(request.body)

        # Check if the user failed to specify any required data.
        if any(key not in data for key in ['hash', 'password']):
            return HttpResponse(status=400)

        if data['password'] != CAMERA_PASSWORD:
            return HttpResponse(status=401)

        image_object = Image()
        image_object.image_hash = data['hash']
        image_object.save()

        return HttpResponse(status=200)
