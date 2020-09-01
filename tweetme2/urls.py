from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from accounts.views import SignUp

urlpatterns = [
    path('', include('tweets.urls')),
    path('profile/', include('profiles.urls')),
    path('api/profiles/', include('profiles.api.urls')),
    path('api/tweets/', include('tweets.api.urls')),
    path('register/', SignUp.as_view(), name='signup'),
    path('', include('django.contrib.auth.urls')),
    path('admin/', admin.site.urls),
]

if settings.DEBUG:
    urlpatterns += static(
        settings.STATIC_URL,
        document_root=settings.STATIC_ROOT
    )
