# PicSure API

PicSure API is our project's backend. It is the endpoint that both the cameras and image viewers talk to.

Written in Python using Django.

### Setup

1. Make sure [Docker](https://www.docker.com) and [Docker Compose](https://docs.docker.com/compose) are installed on your system.
2. Run `docker-compose up -d` in repository root to start the services for setup.
3. Run `docker-compose run --rm api python manage.py migrate` to initialize the database.
4. You can now stop the services using `docker-compose down`.

### Start for Development

After setup, you can simply run `docker-compose up -d` to start the services and `docker-compose down` to stop.

### Accessing the Admin Portal

1. Ensure the services are set up and running.
2. Run `docker-compose run --rm api python manage.py createsuperuser` to create an account.
3. Navigate to http://localhost:8000/admin in a web browser and sign in using the credentials set in step 2. 
