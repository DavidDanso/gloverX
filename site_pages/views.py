from django.shortcuts import render

# Create your views here.
def homePage(request):
    context = {}
    return render(request, 'site_pages/index.html', context)


def aboutPage(request):
    context = {}
    return render(request, 'site_pages/about.html', context)


def servicePage(request):
    context = {}
    return render(request, 'site_pages/services.html', context)


def contactPage(request):
    context = {}
    return render(request, 'site_pages/contact.html', context)


def trackingPage(request):
    context = {}
    return render(request, 'site_pages/tracking.html', context)
