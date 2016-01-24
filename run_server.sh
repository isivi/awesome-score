#!/bin/bash

# Call gunicorn as command to make it work under any active virtual environment
GUNICORN=gunicorn
APPLICATION=ascore.wsgi:application
HOST="localhost"
LOGLEVEL="info"
ERROR="-"  # this is stderr

exec $GUNICORN $APPLICATION \
    --bind=$HOST:$1 \
    --workers=5 \
    --log-level=$LOGLEVEL \
    --error-logfile=$ERROR
