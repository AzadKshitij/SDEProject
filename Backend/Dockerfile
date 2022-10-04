FROM python:3.9

LABEL MAINTAINER="Kshitij Sanodariya sanodariya.1@iitj.ac.in"

ENV GROUP_ID=1000 \
    USER_ID=1000

ADD . /app
WORKDIR /app

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1


RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# WORKDIR /var/www/


# ADD ./requirements.txt /var/www/requirements.txt
# RUN pip install -r requirements.txt
# ADD . /var/www/
# RUN pip install gunicorn