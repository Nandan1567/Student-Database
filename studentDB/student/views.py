from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
from rest_framework.generics import CreateAPIView, ListAPIView, DestroyAPIView, UpdateAPIView
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import Student
from .serializers import StudentSerializers,StudentUpdateSerializers


def index(request):
    return HttpResponse("student")

class StudentList(ListAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializers


# @api_view(['GET', ])
# def api_student_name_list_view(request):
#     student = Student.objects.all()
#     if request.method == 'GET':
#         serializer = StudentSerializers(student, many=True)
#     return Response(serializer.data)

class StudentCreateList(CreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentUpdateSerializers

class StudentDeleteList(DestroyAPIView):
    queryset = Student.objects.all()
    lookup_field = 'pk'
    serializer_class = StudentUpdateSerializers

class StudentUpdateList(UpdateAPIView):
    queryset = Student.objects.all()
    lookup_field = 'pk'
    serializer_class = StudentUpdateSerializers