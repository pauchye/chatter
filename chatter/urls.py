"""chatter URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
# from django.conf.urls import url
from django.contrib import admin
from django.urls import path, re_path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView

from chats.views import home_view
from chats.views import chat_detail_view, chat_list_view, chat_create_view, chat_delete_view, chat_action_view

# urlpatterns = [
#     url('^admin/', admin.site.urls),
#     url('', home_view),
# ]

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home_view),
    path('react/', TemplateView.as_view(template_name='react_via_dj.html')),
    path('chats', chat_list_view),
    path('create-chats', chat_create_view),
    path('chats/<int:chat_id>', chat_detail_view),
    # path("api/chats/action", chat_action_view),
    # path('api/chats/<int:chat_id>/delete', chat_delete_view),
    path('api/chats/', include('chats.urls'))
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)