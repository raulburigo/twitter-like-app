from django.db import models
from django.contrib.auth.models import User


class Tweet(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField(blank=True, null=True)
    image = models.FileField(upload_to='images/', blank=True, null=True)
    likes = models.IntegerField(default=0)

    class Meta:
        ordering = ['-id']

    def serialize(self):
        return {
            "id": self.id,
            "content": self.content,
            "likes": self.likes
        }

    def __str__(self):
        if len(self.content) > 20:
            return self.content[0:20] + "(...)"
        else:
            return self.content[0:20]
