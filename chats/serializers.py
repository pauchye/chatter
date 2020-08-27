from rest_framework import serializers
from django.conf import settings
from .models import Chat

MAX_LENGTH = settings.MAX_LENGTH
CHAT_ACTION_OPTIONS = settings.CHAT_ACTION_OPTIONS

class ChatActionSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    action = serializers.CharField()
    content = serializers.CharField(allow_blank=True, required=False)

    def validate_actions(self, value):
        value = value.lower().strip()
        if not value in CHAT_ACTION_OPTIONS:
            raise serializers.ValidationError("This is not a valid action")
        return value


class ChatCreateSerializer(serializers.ModelSerializer):
    likes = serializers.SerializerMethodField(read_only=True)
    class Meta: 
        model = Chat
        fields = ['id','content','likes']

    def get_likes(self, obj):
        return obj.likes.count()

    def validate_content(self, value):
        if len(value) > MAX_LENGTH:
            raise forms.ValidationError("This is too long")
        return value


class ChatSerializer(serializers.ModelSerializer):
    likes = serializers.SerializerMethodField(read_only=True)
    # content = serializers.SerializerMethodField(read_only=True)
    # is_repost = serializers.SerializerMethodField(read_only=True)
    parent = ChatCreateSerializer(read_only=True)
    class Meta: 
        model = Chat
        fields = ['id','content','likes', "is_repost", "parent"]

    def get_likes(self, obj):
        return obj.likes.count()

    # def get_content(self, obj):
    #     # print('obj', obj)
    #     # print('obj.content', obj.content)
    #     content = obj.content
    #     if obj.is_repost:
    #         # print('obj.parent', obj.parent)
    #         # print('obj.parent.content', obj.parent.content)
    #         content = obj.parent.content
    #     # print("-------------------------")
    #     return content