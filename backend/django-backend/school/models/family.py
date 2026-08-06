from django.db import models

from .student import Student


class Family(models.Model):
    family_id = models.AutoField(primary_key=True)

    student = models.OneToOneField(
        Student,
        on_delete=models.CASCADE,
        related_name="family"
    )

    father_name = models.CharField(max_length=100, blank=True, null=True)
    mother_name = models.CharField(max_length=100, blank=True, null=True)
    guardian = models.CharField(max_length=100, blank=True, null=True)
    parent_phone = models.CharField(max_length=20, blank=True, null=True)

    father_occupation = models.CharField(max_length=100, blank=True, null=True)
    mother_occupation = models.CharField(max_length=100, blank=True, null=True)

    father_education = models.CharField(max_length=100, blank=True, null=True)
    mother_education = models.CharField(max_length=100, blank=True, null=True)

    family_members = models.IntegerField(blank=True, null=True)
    school_going_children = models.IntegerField(blank=True, null=True)
    birth_order = models.IntegerField(blank=True, null=True)

    class Meta:
        db_table = "family"

    def __str__(self):
        return f"Family - {self.student.full_name}"