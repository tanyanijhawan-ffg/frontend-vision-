from django.db import models

from .center import Center


class Student(models.Model):
    student_id = models.AutoField(primary_key=True)
    centre = models.ForeignKey(Center, on_delete=models.CASCADE, related_name='students')
    full_name = models.CharField(max_length=150)
    nick_name = models.CharField(max_length=100, blank=True, null=True)
    gender = models.CharField(max_length=20, blank=True, null=True)
    dob = models.DateField(blank=True, null=True)
    age = models.IntegerField(blank=True, null=True)
    photo = models.CharField(max_length=255, blank=True, null=True)
    school_name = models.CharField(max_length=150, blank=True, null=True)
    school_type = models.CharField(max_length=50, blank=True, null=True)
    class_grade = models.CharField(max_length=30, blank=True, null=True)
    medium_of_instruction = models.CharField(max_length=50, blank=True, null=True)
    attendance_pattern = models.CharField(max_length=100, blank=True, null=True)
    previous_academic_performance = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        db_table = 'student'

    def __str__(self):
        return self.full_name or f'Student {self.student_id}'
