from django.shortcuts import render, redirect
from django.http import HttpResponse, Http404, JsonResponse
# from .models import Chat
# from .forms import ChatForm
from django.utils.http import is_safe_url
from django.conf import settings
# from .serializers import ChatSerializer, ChatActionSerializer, ChatCreateSerializer
# from rest_framework.response import Response
# from rest_framework.decorators import api_view, permission_classes, authentication_classes
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.authentication import SessionAuthentication
import random

ALLOWED_HOSTS = settings.ALLOWED_HOSTS
# Create your views here.
def home_view(request, *args, **kwargs):
    username = None
    if request.user.is_authenticated:
        username = request.user.username
    return render(request, "pages/home.html", context={"username": username}, status=200)

def chats_list_view(request, *args, **kwargs):
    return render(request, "chats/list.html")

def chats_detail_view(request, chat_id, *args, **kwargs):
    return render(request, "chats/detail.html", context={"chat_id": chat_id})

def chats_profile_view(request, username, *args, **kwargs):
    return render(request, "chats/profile.html", context={"profile_username": username})

# @api_view(['GET'])
# def chat_list_view(request, *args, **kwargs):
#     qs = Chat.objects.all()
#     username = request.GET.get('username')
#     if username != None:
#         qs = qs.filter(user__username__iexact=username)
#     serializer = ChatSerializer(qs, many=True)
#     return Response(serializer.data, status=200)

# @api_view(['GET'])
# def chat_detail_view(request, chat_id, *args, **kwargs):
#     qs = Chat.objects.filter(id=chat_id)
#     if not qs.exists():
#         return Response({}, status=404)
#     obj = qs.first()
#     serializer = ChatSerializer(obj)
#     return Response(serializer.data, status=200)


# @api_view(['DELETE', 'POST'])
# @permission_classes([IsAuthenticated])
# def chat_delete_view(request, chat_id, *args, **kwargs):
#     qs = Chat.objects.filter(id=chat_id)
#     if not qs.exists():
#         return Response({}, status=404)
#     qs = qs.filter(user=request.user)
#     if not qs.exists():
#         return Response({"message": "You cannot delete this post"}, status=401)
#     obj = qs.first()
#     obj.delete()
#     return Response({"message": "This post has been deleted"}, status=200)


# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def chat_action_view(request, *args, **kwargs):
#     print(request)
#     serializer = ChatActionSerializer(data=request.data)
#     if serializer.is_valid(raise_exception=True):
        
#         data = serializer.validated_data
#         chat_id = data.get("id")
#         action = data.get("action")
#         qs = Chat.objects.filter(id=chat_id)
#         content = data.get("content")
#         print("data", data)
#         if not qs.exists():
#             return Response({}, status=404)
#         obj = qs.first()
#         if action == "like":
#             serializer = ChatSerializer(obj)
#             obj.likes.add(request.user)
#             return Response(serializer.data, status=200)
#         elif action == "unlike":
#             obj.likes.remove(request.user)
#             serializer = ChatSerializer(obj)
#             return Response(serializer.data, status=200)
#         elif action == "repost":
#             parent_obj = obj
#             new_chat = Chat.objects.create(user=request.user, parent=parent_obj, content=content )
#             serializer = ChatSerializer(new_chat)
#             # print("data", data)
#             # print("parent", new_chat.parent)
#             # print("parent content", parent_obj.content)
#             # print("parent likes", parent_obj.likes)
#             # print("parent content", new_chat.parent.content)
#             return Response(serializer.data, status=200)
            

#     return Response({}, status=200)



# @api_view(['POST'])
# # @authentication_classes([SessionAuthentication])
# @permission_classes([IsAuthenticated])
# def chat_create_view(request, *args, **kwargs):
#     # print(request.data)
#     serializer = ChatCreateSerializer(data=request.data)
#     if serializer.is_valid(raise_exception=True):
#         serializer.save(user=request.user)
#         return Response(serializer.data, status=201)
#     return Response({}, status=400)


 


# def chat_create_view_pure_django(request, *args, **kwargs):
#     user = request.user
#     if not request.user.is_authenticated:
#         user = None
#         if request.is_ajax():
#             return JsonResponse({}, status=401)
#         return redirect(settings.LOGIN_URL)
#     # print("ajax", request.is_ajax())
#     # print("request", request)
#     next_url = request.POST.get("next") or None
#     form = ChatForm(request.POST or None)
#     if form.is_valid():
#         obj = form.save(commit=False)
#         obj.user = user 
#         obj.save()
#         if request.is_ajax():
#             return JsonResponse(obj.serialize(), status=201)

#         if next_url != None and is_safe_url(next_url, ALLOWED_HOSTS):
#             return redirect(next_url)
#         form = ChatForm()

#     if form.errors:
#         if request.is_ajax():
#             return JsonResponse(form.errors, status=400)

#     return render(request, 'components/form.html', context={"form": form})


# def chat_list_view_pure_django(request, *args, **kwargs):
#     qs = Chat.objects.all()
#     # chat_list = [{"id": x.id, "content": x.content, "likes": random.randint(0, 100)} for x in qs]
#     chat_list = [x.serialize() for x in qs]
#     data = {
#         "response": chat_list,
#         "isUser": False
#     }

#     return JsonResponse(data, status=200)


# def chat_detail_view_pure_django(request, chat_id, *args, **kwargs):
#     data = {
#         "id": chat_id
#     }
#     status = 200     

#     try: 
#         obj = Chat.objects.get(id=chat_id )
#         data['content'] = obj.content
#     except:
#         data['message'] = "Not Found"
#         status = 404
#         # raise Http404

#     return JsonResponse(data, status=status)
#     # return HttpResponse(f"<h1>Hello {chat_id} - {obj.content}</h1>")
