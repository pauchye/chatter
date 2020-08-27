from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import Chat
from .serializers import ChatSerializer
from rest_framework.test import APIClient
# Create your tests here.
User = get_user_model()

class ChatTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="def", password="password")
        Chat.objects.create(content="abcdef", user=self.user)
        Chat.objects.create(content="abcdef2", user=self.user)
        Chat.objects.create(content="abcdef3", user=self.user)
        self.currentCount = Chat.objects.all().count()

    def test_user_created(self):
        self.assertEqual(self.user.username, "def")

    def test_chat_created(self):
        
        # qs = Chat.objects.all()
        
        chat2 = Chat.objects.create(content="abc", user=self.user)
        
        # for x in qs:
        #     # obj = ChatSerializer(x)
        #     print('content', x.content)
        #     print('hi', x.id)
        self.assertEqual(chat2.user, self.user)
        # self.assertEqual(chat2.id, 7)


    def get_client(self):
        client = APIClient()
        client.login(username=self.user.username, password='password')
        return client

    def test_chat_list(self):
        client = self.get_client()
        response = client.get("/api/chats/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 3)
        # print(response.json())

    def test_action_like(self):
        client = self.get_client()
        qs = Chat.objects.first()
        response = client.post("/api/chats/action", {"id": qs.id, "action": "like"})
        self.assertEqual(response.status_code, 200)
        like_count = response.json().get("likes")
        self.assertEqual(like_count, 1)


    def test_action_unlike(self):
        client = self.get_client()
        qs = Chat.objects.first()
        # print("client", client)
        response = client.post("/api/chats/action", {"id": qs.id, "action": "like"})
        # print("response", response)
        self.assertEqual(response.status_code, 200)
        response = client.post("/api/chats/action", {"id": qs.id, "action": "unlike"})
        self.assertEqual(response.status_code, 200)
        like_count = response.json().get("likes")
        self.assertEqual(like_count, None)

    
    def test_action_retweet(self):
        client = self.get_client()
        qs = Chat.objects.first()
        response = client.post("/api/chats/action", 
            {"id": qs.id, "action": "repost"})
        self.assertEqual(response.status_code, 200)
        data = response.json()
        new_chat_id = data.get("id")
        self.assertNotEqual(qs.id, new_chat_id)
        new_qs_len = len(Chat.objects.all())
        self.assertEqual(self.currentCount + 1, new_qs_len)