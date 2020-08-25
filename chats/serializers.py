from rest_framework import serializers
from django.conf import settings
from .models import Chat

MAX_LENGTH = settings.MAX_LENGTH

class ChatSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Chat
        fields = ['content']

    def validate_content(self, value):
        if len(value) > MAX_LENGTH:
            raise forms.ValidationError("This is too long")
        return value
