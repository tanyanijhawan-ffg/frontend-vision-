from django.http import HttpResponse


def home(request):
    return HttpResponse('Hello, Vision Global Empowerment!')
