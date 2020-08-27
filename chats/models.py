from django.db import models
import random
from django.conf import settings

User = settings.AUTH_USER_MODEL

# Create your models here.
class ChatLike(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    chat = models.ForeignKey("Chat", on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)


class Chat(models.Model):
    parent=models.ForeignKey("self", null=True, on_delete=models.SET_NULL)
    user=models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField(blank=True, null=True)
    image = models.FileField(upload_to='images/', blank=True, null=True)
    likes = models.ManyToManyField(User, related_name='chat_user', blank=True, through=ChatLike)
    timestamp = models.DateTimeField(auto_now_add=True)


    # def __str__(self):
    #     return self.content

    class Meta:
        ordering = ["-id"]

    @property
    def is_repost(self):
        return self.parent != None

    def serialize(self):
        return {
            "id": self.id,
            "content": self.content,
            "likes": random.randint(0, 100)
        }