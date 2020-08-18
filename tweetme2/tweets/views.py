from django.http import JsonResponse
from django.shortcuts import render, redirect
from .models import Tweet
from .forms import TweetForm
from django.utils.http import is_safe_url
from django.conf import settings
from django.contrib.auth.decorators import login_required

# Create your views here.


def home_view(request, *args, **kwargs):
    return render(request, 'pages/home.html', context={}, status=200)


@login_required
def tweet_create_view(request, *args, **kwargs):
    form = TweetForm(request.POST or None)
    next_url = request.POST.get("next") or None
    if form.is_valid():
        obj = form.save(commit=False)
        # do other form related logic
        obj.user = request.user 
        obj.save()
        if request.is_ajax():
            return JsonResponse(obj.serialize(), status=201)  # 201 == created items
        if next_url and is_safe_url(next_url, settings.ALLOWED_HOSTS):
            return redirect(next_url)
        form = TweetForm()  # clear the form
    if form.errors:
        if request.is_ajax():
            return JsonResponse(form.errors, status=400)
    return render(request, 'components/form.html', context={"form": form})


def tweet_list_view(request, *args, **kwargs):
    queryset = Tweet.objects.all()
    tweets_list = [x.serialize() for x in queryset]
    data = {
        "response": tweets_list
    }
    return JsonResponse(data)


def tweet_detail_view(request, tweet_id, *args, **kwargs):
    """
    REST API VIEW (BEM TOSCA)
    """
    data = {
        "id": tweet_id,
    }
    status = 200
    try:
        obj = Tweet.objects.get(id=tweet_id)
        data['content'] = obj.content
    except Tweet.DoesNotExist:
        data['message'] = "Not found"
        status = 404

    return JsonResponse(data, status=status)
