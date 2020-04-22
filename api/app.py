import json

from os import environ
from redis import Redis
from flask import Flask, request


app = Flask(__name__)
redis = Redis('database')


@app.route('/', methods=['GET', 'POST'])
def index():
    try:
        data = json.loads(request.get_data().decode())
    except json.JSONDecodeError:
        return '', 400

    if request.method == 'GET':
        # Check if the user failed to specify any required data.
        if 'hash' not in data:
            return '', 400

        # Check if the hash exists in the database.
        if redis.exists(data['hash']):
            return '', 200

        return '', 204

    if request.method == 'POST':
        # Check if the user failed to specify any required data.
        if 'hash' not in data or 'password' not in data:
            return '', 400

        # Make sure the camera has a valid password. If this check fails, someone is trying to spoof a camera.
        if data['password'] != environ['CAMERA_PASSWORD']:
            return '', 401

        # Save the image hash to the database.
        redis.set(data['hash'], 1)

        return '', 200

    return 'Unsupported method.'
