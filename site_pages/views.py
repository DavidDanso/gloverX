from django.shortcuts import render
from .seo_meta import META_DESCRIPTIONS, PAGE_TITLES

# Create your views here.
def homePage(request):
    context = {
        'meta_description': 'Leading shipping company in Ghana providing professional import/export services, customs clearing, and international logistics. Fast, reliable shipping solutions.',
        'page_title': 'GloverX Shipping | Premier Logistics Services in Ghana'
    }
    return render(request, 'home.html', context)


def aboutPage(request):
    context = {
        'meta_description': 'Learn about GloverX Shipping - your trusted shipping partner in Ghana. Expert team delivering reliable import/export and customs clearing services.',
        'page_title': 'About Us | GloverX Shipping Ghana'
    }
    return render(request, 'about.html', context)


def servicePage(request):
    context = {
        'meta_description': 'Comprehensive shipping services including international freight, customs clearing, door-to-door delivery, and warehousing solutions in Ghana.',
        'page_title': 'Our Services | GloverX Shipping & Logistics'
    }
    return render(request, 'services.html', context)


def contactPage(request):
    context = {
        'meta_description': 'Contact GloverX Shipping for all your logistics needs in Ghana. 24/7 customer support, fast response, and professional shipping assistance.',
        'page_title': 'Contact Us | GloverX Shipping'
    }
    return render(request, 'contact.html', context)


def trackingPage(request):
    context = {
        'meta_description': META_DESCRIPTIONS['tracking'],
        'page_title': PAGE_TITLES['tracking'],
    }
    return render(request, 'site_pages/tracking.html', context)
