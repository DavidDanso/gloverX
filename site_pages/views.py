from django.shortcuts import render
from .seo_meta import META_DESCRIPTIONS, PAGE_TITLES

# Create your views here.
def homePage(request):
    context = {
        'meta_description': META_DESCRIPTIONS['home'],
        'page_title': PAGE_TITLES['home']
    }
    return render(request, 'site_pages/index.html', context)


def aboutPage(request):
    context = {
        'meta_description': META_DESCRIPTIONS['about'],
        'page_title': PAGE_TITLES['about']
    }
    return render(request, 'site_pages/about.html', context)


def servicePage(request):
    context = {
        'meta_description': META_DESCRIPTIONS['services'],
        'page_title': PAGE_TITLES['services'],
    }
    return render(request, 'site_pages/services.html', context)


def contactPage(request):
    context = {
        'meta_description': META_DESCRIPTIONS['contact'],
        'page_title': PAGE_TITLES['contact'],
    }
    return render(request, 'site_pages/contact.html', context)


def trackingPage(request):
    context = {
        'meta_description': META_DESCRIPTIONS['tracking'],
        'page_title': PAGE_TITLES['tracking'],
    }
    return render(request, 'site_pages/tracking.html', context)
