from django import forms
from django.conf import settings
from .models import Chat

MAX_LENGTH = settings.MAX_LENGTH

class ChatForm(forms.ModelForm):
    class Meta:
        model = Chat
        fields = ['content']

    def clean_content(self):
        content = self.cleaned_data.get("content")
        if len(content) > MAX_LENGTH:
            raise forms.ValidationError("This is too long")
        return content