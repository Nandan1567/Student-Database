from django.urls import path, include
from .views import StudentList,StudentCreateList,StudentDeleteList,StudentUpdateList
from rest_framework import routers

appname='student'

urlpatterns = [
    path('student/',StudentList.as_view(),name='student'),
    path('student/post',StudentCreateList.as_view(),name='studentpost'),
    path('student/delete/<int:pk>/',StudentDeleteList.as_view(),name='studentdelete'),
    path('student/update/<int:pk>/',StudentUpdateList.as_view(),name='studentupdate')

]