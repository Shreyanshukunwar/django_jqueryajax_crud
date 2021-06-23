from django.http.response import JsonResponse
from django.shortcuts import render

from .models import User
from .forms import UserForm

# Create your views here.
def home(request):
    form = UserForm()

    users = User.objects.all()

    context = {
        'form': form,
        'users': users,
    }
    return render(request, 'crudajax/crud.html', context)

def save_data(request):

    if request.method == 'POST':
        form = UserForm(request.POST)
        if form.is_valid():
            userId = request.POST.get('userId')
            name = request.POST.get('name')
            email = request.POST.get('email')
            address = request.POST.get('address')
            # print("Edit user id is:", userId)

            if (userId == ''):
                usr = User(name=name, email=email, address=address)
            else:
                usr = User(id=userId, name=name, email=email, address=address)
            usr.save()

            allUsers = User.objects.values()
            user_data = list(allUsers)
            return JsonResponse({
                'status':'Save',
                'user_data': user_data,
            })
        else:
            return JsonResponse({
                'Status': 'Failed'
            })

def delete_data(request):
    if request.method == 'POST':
        id = request.POST.get('id')
        print(id)
        user = User.objects.get(pk=id)
        user.delete()
        return JsonResponse({
            'status':1
        })
    else:
        return JsonResponse({
            'status': 0
        })

def edit_data(request):
    if request.method == 'POST':
        id = request.POST.get('id')
        print("Id is: ", id)
        user = User.objects.get(pk=id)
        user_data = {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "address": user.address
        }
        return JsonResponse(user_data)
