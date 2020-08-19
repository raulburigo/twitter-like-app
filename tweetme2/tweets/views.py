from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import Tweet
from .serializers import (
    TweetSerializer,
    TweetCreateSerializer,
    TweetActionSerializer,
)

# Create your views here.


def home_view(request, *args, **kwargs):
    return render(request, 'pages/home.html', context={}, status=200)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def tweet_create_view(request, *args, **kwargs):
    serializer = TweetCreateSerializer(data=request.POST or None)
    if serializer.is_valid(raise_exception=True):
        serializer.save(user=request.user)
        return Response(serializer.data, status=201)
    return Response({}, status=400)


@api_view(['GET'])
def tweet_list_view(request, *args, **kwargs):
    queryset = Tweet.objects.all()
    serializer = TweetSerializer(queryset, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def tweet_detail_view(request, tweet_id, *args, **kwargs):
    queryset = Tweet.objects.filter(id=tweet_id)
    obj = queryset.first()
    if obj is None:
        return Response({}, status=404)
    else:
        serializer = TweetSerializer(obj)
        return Response(serializer.data)


@api_view(['DELETE', 'POST'])
@permission_classes([IsAuthenticated])
def tweet_delete_view(request, tweet_id, *args, **kwargs):
    queryset = Tweet.objects.filter(id=tweet_id)
    obj = queryset.first()
    if obj is None:
        return Response({}, status=404)
    else:
        if obj.user != request.user:
            return Response({"message": "You cannot delete this tweet"}, status=401)
        else:
            obj.delete()
            return Response({"message": "Tweet removed"}, status=200)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def tweet_action_view(request, *args, **kwargs):
    """
    id is required
    Action options are: like, unlike, retweet
    """
    serializer = TweetActionSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        data = serializer.validated_data
        tweet_id = data.get("id")
        action = data.get("action")
        content = data.get("content")

    queryset = Tweet.objects.filter(id=tweet_id)
    obj = queryset.first()
    if obj is None:
        return Response({}, status=404)
    else:
        if action == "like":
            obj.likes.add(request.user)
            serializer = TweetSerializer(obj)
            return Response(serializer.data, status=200)
        elif action == "unlike":
            obj.likes.remove(request.user)
            serializer = TweetSerializer(obj)
            return Response(serializer.data, status=200)
        elif action == "retweet":
            print("retweeting: ", content)
            new_tweet = Tweet.objects.create(
                user=request.user,
                original_tweet=obj,
                content=content
            )
            serializer = TweetSerializer(new_tweet)
            return Response(serializer.data, status=201)
