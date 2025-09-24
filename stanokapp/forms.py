from django import forms
from .models import Message

class MessageContactForm(forms.ModelForm):
    class Meta:
        model = Message
        fields = ["title", "message", "phone", "email"]



