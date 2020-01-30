from django.db import models


class Student(models.Model):
    firstName=models.CharField(max_length=50)
    lastName=models.CharField(max_length=50)
    skills=models.CharField(max_length=200)

    def __str__(self):
        return self.firstName

    def get_skills_list(self):
        return list(str(self.skills).split(','))