from django.conf import settings

from ascore.utils.nostats import stats_on


def ascore_settings(request):
    DEBUG = settings.DEBUG
    COMPRESS_ENABLED = settings.COMPRESS_ENABLED
    FUNCTIONS = settings.FUNCTIONS

    is_stats_request = stats_on(request)

    return {'ascore_settings': locals()}
