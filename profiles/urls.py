from django.urls import path
from . import views

urlpatterns = [
    path('edit', views.profile_update_view),
    path('<str:username>', views.profile_detail_view),
]
