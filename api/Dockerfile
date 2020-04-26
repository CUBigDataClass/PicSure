FROM python:3.8.2

ARG REDIS_HOST=database

ENV FLASK_APP app.py
ENV PYTHONUNBUFFERED 1
ENV REDIS_HOST $REDIS_HOST

COPY . /api
WORKDIR /api

RUN pip install -r requirements.txt

CMD python app.py
