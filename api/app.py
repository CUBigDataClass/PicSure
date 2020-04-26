import json

from os import environ
from redis import Redis
from flask import Flask, request, Response


app = Flask(__name__)
redis = Redis(environ['REDIS_HOST'])


@app.route('/', methods=['GET', 'POST'])
def index():
    response = Response('')
    response.headers['Access-Control-Allow-Origin'] = '*'

    try:
        data = json.loads(request.get_data().decode())
    except json.JSONDecodeError:
        response.status_code = 400
        return response

    if request.method == 'GET':
        # Check if the user failed to specify any required data.
        if 'hash' not in data:
            response.status_code = 400

        # Check if the hash exists in the database.
        if redis.exists(data['hash']):
            response.status_code = 200

        response.status_code = 204

    elif request.method == 'POST':
        # Check if the user failed to specify any required data.
        if 'hash' not in data or 'password' not in data:
            response.status_code = 400

        # Make sure the camera has a valid password. If this check fails, someone is trying to spoof a camera.
        if data['password'] != environ['CAMERA_PASSWORD']:
            response.status_code = 401

        # Save the image hash to the database.
        redis.set(data['hash'], 1)

        response.status_code = 200

    return response
