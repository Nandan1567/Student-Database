from rest_framework import serializers
from .models import Student


class StudentSerializers(serializers.ModelSerializer):
    skills = serializers.ListField(source='get_skills_list')
    class Meta:
        model = Student
        fields = ('pk','firstName', 'lastName', 'skills')


class StudentUpdateSerializers(serializers.ModelSerializer):
    class Meta:
        model=Student
        fields = ('pk','firstName', 'lastName', 'skills')