from django.conf.urls import url

from .views import home, send_email, no_stats, stats

urlpatterns = [
    url(r'^$', home, name='home'),
    url(r'^send_email/$', send_email, name='send_email'),

    # Stats
    url(r'^nostats/$', no_stats, name='no_stats'),
    url(r'^stats/$', stats, name='stats'),
]
