from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse
from api.views import CreateUserView, CurrentUserView, ChangePasswordView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

def health_check():
    return JsonResponse({"status": "ok"})

urlpatterns = [
    path("admin/", admin.site.urls),
    path("healthcheck/", health_check),
    path("api/user/register/", CreateUserView.as_view(), name="register"),
    path("api/user/current/", CurrentUserView.as_view(), name="current_user"),
    path("api/user/changepwd/", ChangePasswordView.as_view(), name="change_password"),
    path("api/token/", TokenObtainPairView.as_view(), name="get_token"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("api-auth/", include("rest_framework.urls")),
    path("api/", include("api.urls")),
]