import json

from os import environ
from redis import Redis
from flask import Flask, request, Response
from waitress import serve


app = Flask(__name__)
redis = Redis(environ['REDIS_HOST'])


@app.route('/', methods=['GET', 'POST'])
def index():
    response = Response('')
    response.headers['Access-Control-Allow-Origin'] = '*'

    if request.method == 'GET':
        # Check if the user failed to specify any required data.
        if 'hash' not in request.args:
            response.status_code = 400

        # Check if the hash exists in the database.
        elif redis.exists(request.args['hash']):
            response.status_code = 200

        else:
            response.status_code = 204

    elif request.method == 'POST':
        try:
            data = json.loads(request.get_data().decode())
        except json.JSONDecodeError:
            response.status_code = 400
            return response

        # Check if the user failed to specify any required data.
        if 'hash' not in data or 'password' not in data:
            response.status_code = 400

        # Make sure the camera has a valid password. If this check fails, someone is trying to spoof a camera.
        elif data['password'] != environ['CAMERA_PASSWORD']:
            response.status_code = 401

        else:
            # Save the image hash to the database.
            redis.set(data['hash'], 1)
            response.status_code = 200

    else:
        response.status_code = 400

    return response


if __name__ == '__main__':
    serve(app, port=5000)
