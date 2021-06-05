from django.conf.urls import url, include
from rest_framework import routers
from app.api.views import Hello

router = routers.DefaultRouter()
router.register(r'hello', Hello, basename='get')

urlpatterns = [
    url(r'', include(router.urls)),
    url(r'hello', Hello.as_view())
]
