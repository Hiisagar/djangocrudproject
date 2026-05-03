from django.shortcuts import render,redirect
from django.http import HttpResponse
from .models import Student

# Create your views here.


def add_show(request):
    if request.method == 'POST':
        name = request.POST.get('name',"")
        age = request.POST.get('age',"")
        phone = request.POST.get('phone',"")

        student = Student(name=name,age=age,phone=phone)
        student.save()
        return redirect('/')
    
    student_data = Student.objects.all()

    return render(request,'enroll/readandshow.html',{'data': student_data})


def update_student(request, id):
    update_student = Student.objects.get(pk=id)
    if request.method == 'POST':
        update_student.name = request.POST.get('name',"")
        update_student.age = request.POST.get('age',"")
        update_student.phone = request.POST.get('phone',"")

        update_student.save()
        return redirect('/')

    return render(request, 'enroll/updatestudent.html', {'data': update_student})