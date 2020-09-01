from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated


def home_view(request, *args, **kwargs):
    return render(request, 'pages/new_home.html')


@login_required
def local_tweets_list_view(request, *args, **kwargs):
    return render(
        request,
        'tweets/list.html',
        context={},
        status=200
    )


@permission_classes([IsAuthenticated])
def local_tweets_detail_view(request, tweet_id, *args, **kwargs):
    return render(
        request,
        'tweets/detail.html',
        context={"tweet_id": tweet_id},
        status=200
    )
