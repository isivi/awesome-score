from django.conf import settings


def ascore_settings(request):
    DEBUG = settings.DEBUG
    COMPRESS_ENABLED = settings.COMPRESS_ENABLED

    return {'ascore_settings': locals()}
