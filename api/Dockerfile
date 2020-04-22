FROM python:3.8.2

ENV FLASK_APP=app.py
ENV PYTHONUNBUFFERED 1

COPY . /api
WORKDIR /api

RUN pip install -r requirements.txt
