from django.db import models
from django.contrib.auth.models import User
from django.db.models import Q


class TweetLike(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    tweet = models.ForeignKey("Tweet", on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)


class TweetQuerySet(models.QuerySet):
    def feed(self, user):
        if user.following.exists():
            followed_user_ids = user.following.values_list("user__id", flat=True)
            return self.filter(
                Q(user__id__in=followed_user_ids) |
                Q(user=user)
            ).order_by("-id")
        else:
            return self.filter(user=user).order_by("-id")


class TweetManager(models.Manager):
    def get_queryset(self, *args, **kwargs):
        return TweetQuerySet(self.model, using=self._db)

    def feed(self, user):
        return self.get_queryset().feed(user)


class Tweet(models.Model):

    original_tweet = models.ForeignKey("self", null=True, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tweets')
    likes = models.ManyToManyField(User, related_name='likes', blank=True, through=TweetLike)
    content = models.TextField(blank=True, null=True)
    image = models.FileField(upload_to='images/', blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    objects = TweetManager()

    class Meta:
        ordering = ['-id']

    @property
    def is_retweet(self):
        return self.original_tweet is not None
