from django.urls import path

from chats.api.views import chat_detail_view, chat_list_view, chat_create_view, chat_delete_view, chat_action_view


urlpatterns = [
    path('', chat_list_view),
    path("action", chat_action_view),
    path('create', chat_create_view),
    path('<int:chat_id>', chat_detail_view),
    path('<int:chat_id>/delete', chat_delete_view),
]
