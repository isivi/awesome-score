from ascore.ascore_app.forms import EmailForm
from ascore.decorators import with_template

from django.shortcuts import render
from django.template.response import TemplateResponse


@with_template('ascore_app/home.html')
def home(request):
    email_form = EmailForm();

    return {'form': email_form}
