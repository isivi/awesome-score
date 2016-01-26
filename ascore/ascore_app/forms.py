# -*- coding: utf-8 -*-

from django import forms


class EmailForm(forms.Form):
    email = forms.EmailField(required=True,
                             widget=forms.widgets.TextInput(attrs={'placeholder': 'Wpisz adres email...'}))