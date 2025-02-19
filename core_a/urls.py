"""
URL configuration for core_a project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, reverse
from django.conf import settings
from django.conf.urls.static import static
from site_pages.views import *
from django.contrib.sitemaps import Sitemap
from django.contrib.sitemaps.views import sitemap
from django.http import HttpResponse

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
    path('sitemap.xml', sitemap, {'sitemaps': sitemaps}),
    path('about', aboutPage, name='about'),
    path('services', servicePage, name='services'),
    path('contact', contactPage, name='contact'),
    path('tracking', trackingPage, name='tracking'),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)