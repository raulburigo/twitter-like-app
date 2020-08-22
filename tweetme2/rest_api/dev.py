from rest_framework import authentication
from django.contrib.auth.models import User


class DevAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        # qs = User.objects.all()  # random user
        qs = User.objects.filter(id=1)  # admin
        user = qs.order_by("?").first()
        return (user, None)
