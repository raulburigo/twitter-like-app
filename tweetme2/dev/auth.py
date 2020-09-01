from rest_framework import authentication
from django.contrib.auth.models import User


class DevAuth(authentication.BasicAuthentication):
    def authenticate(self, request):
        user = User.objects.filter(id=1).get()
        return (user, None)
