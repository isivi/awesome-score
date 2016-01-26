from django.conf.urls import url

from .views import home, send_email

urlpatterns = [
    url(r'^$', home, name='home'),
    url(r'^send_email/$', send_email, name='send_email'),
]
