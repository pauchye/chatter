from django.urls import path, re_path, include

from .views import profile_detail_view

urlpatterns = [
    path('<str:username>', profile_detail_view),
]

