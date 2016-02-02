# -*- coding: utf-8 -*-

from ascore.ascore_app.forms import EmailForm
from ascore.decorators import with_template

from django.core.mail.message import EmailMessage
from django.http import JsonResponse
from django.views.decorators.http import require_POST


@with_template('ascore_app/home.html')
def home(request):
    email_form = EmailForm()

    return {'form': email_form}


@require_POST
def send_email(request):
    RECIPIENTS = ['konrad.sloniewski@gmail.com', 'tk.glowka@gmail.com']
    response = {'success': False}

    email_form = EmailForm(request.POST)
    if email_form.is_valid():
        user_email = email_form.cleaned_data['email']

        for to in RECIPIENTS:
            email = EmailMessage()
            email.subject = u'Nowe zgłoszenie w rekrutacji IT'
            email.body = u'Nowe zgłoszenie w rekrutacji IT: ' + user_email
            email.content_subtype = 'html'
            email.from_email = u'isivi.pl <admin@isivi.pl>'
            email.to = [ to ]
            email.send()

        response['success'] = True

    return JsonResponse(response)
