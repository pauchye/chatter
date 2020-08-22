from django import forms

from .models import Chat

MAX_LENGTH = 240

class ChatForm(forms.ModelForm):
    class Meta:
        model = Chat
        fields = ['content']

    def clean_content(self):
        content = self.cleaned_data.get("content")
        if len(content) > MAX_LENGTH:
            raise forms.ValidationError("This is too long")
        return content