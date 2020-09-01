from django.urls import path
from . import views

urlpatterns = [
    path('', views.home_view),
    path('global', views.local_tweets_list_view),
    path('<int:tweet_id>/', views.local_tweets_detail_view),
]
