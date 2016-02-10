from __future__ import absolute_import

from datetime import timedelta

from django.utils import timezone
from django.conf import settings


def set_cookie(response):
    response.set_cookie(key=settings.NO_STATS_COOKIE_NAME, value=1,
                        expires=timezone.now() + timedelta(days=365))


def delete_cookie(response):
    response.delete_cookie(key=settings.NO_STATS_COOKIE_NAME)


def stats_off(request):
    return settings.NO_STATS_COOKIE_NAME in request.COOKIES


def stats_on(request):
    return settings.NO_STATS_COOKIE_NAME not in request.COOKIES
