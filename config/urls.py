from django.conf.urls.i18n import i18n_patterns
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('i18n/', include('django.conf.urls.i18n')),  # set_language shu yerda bo'ladi
    path('admin/', admin.site.urls),
]

# i18n_patterns orqali til prefiksi qo'shiladi (/uz/, /ru/, /en/)
urlpatterns += i18n_patterns(
    path('', include('stanokapp.urls')),
)

# Static va media fayllar uchun
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
