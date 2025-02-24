from django.contrib import admin
from django.urls import path, reverse
from django.conf import settings
from django.conf.urls.static import static
from site_pages.views import *
from django.contrib.sitemaps import Sitemap
from django.contrib.sitemaps.views import sitemap
from django.http import HttpResponse
from django.views.generic.base import RedirectView

def robots_txt(request):
    return HttpResponse("User-agent: *\nAllow: /", content_type="text/plain")

class BasicSitemap(Sitemap):
    changefreq = "weekly"
    priority = 0.8
    def items(self):
        return ['home', 'about', 'services', 'contact', 'tracking']
    def location(self, item):
        return reverse(item)

sitemaps = {'basic': BasicSitemap}

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', homePage, name='home'),
    path('robots.txt', robots_txt),
    path('sitemap.xml', sitemap, {'sitemaps': sitemaps},
         name='django.contrib.sitemaps.views.sitemap'),
    path('about/', aboutPage, name='about'),
    path('services/', servicePage, name='services'),
    path('contact/', contactPage, name='contact'),
    path('tracking/', trackingPage, name='tracking'),

    path('favicon.ico', RedirectView.as_view(url=settings.STATIC_URL + 'images/favicon/favicon.ico')),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)