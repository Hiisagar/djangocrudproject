from django.shortcuts import render,redirect
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