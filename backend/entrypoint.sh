#!/bin/sh

python wait_for_db.py
python manage.py collectstatic --noinput
python manage.py migrate --noinput
python -m gunicorn backend.wsgi:application --bind 0.0.0.0:8000