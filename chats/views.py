from django.shortcuts import render, redirect
from django.http import HttpResponse, Http404, JsonResponse
from .models import Chat
from .forms import ChatForm
from django.utils.http import is_safe_url
from django.conf import settings
import random

ALLOWED_HOSTS = settings.ALLOWED_HOSTS
# Create your views here.
def home_view(request, *args, **kwargs):
    print('args', args, 'kwargs', kwargs)
    # return HttpResponse("<h1>Hello World</h1>")
    return render(request, "pages/home.html", context={}, status=200)

def chat_detail_view(request, chat_id, *args, **kwargs):
    data = {
        "id": chat_id
    }
    status = 200     

    try: 
        obj = Chat.objects.get(id=chat_id )
        data['content'] = obj.content
    except:
        data['message'] = "Not Found"
        status = 404
        # raise Http404

    return JsonResponse(data, status=status)
    # return HttpResponse(f"<h1>Hello {chat_id} - {obj.content}</h1>")

def chat_list_view(request, *args, **kwargs):
    qs = Chat.objects.all()
    chat_list = [{"id": x.id, "content": x.content, "likes": random.randint(0, 100)} for x in qs]
    data = {
        "response": chat_list,
        "isUser": False
    }

    return JsonResponse(data, status=200)

def chat_create_view(request, *args, **kwargs):
    next_url = request.POST.get("next") or None
    form = ChatForm(request.POST or None)
    if form.is_valid():
        obj = form.save(commit=False)
        obj.save()
        if next_url != None and is_safe_url(next_url, ALLOWED_HOSTS):
            return redirect(next_url)
        form = ChatForm()
    return render(request, 'components/form.html', context={"form": form})
