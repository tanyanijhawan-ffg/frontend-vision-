from django.db import models
from .student import Student

class SocioEconomic(models.Model):
    socio_id = models.AutoField(primary_key=True)

    student = models.ForeignKey(
        Student,
        on_delete=models.CASCADE,
        related_name="socio_economics"
    )

    caste_category = models.CharField(max_length=50, blank=True, null=True)
    tribe_name = models.CharField(max_length=100, blank=True, null=True)
    religion = models.CharField(max_length=100, blank=True, null=True)
    income_range = models.CharField(max_length=50, blank=True, null=True)
    house_type = models.CharField(max_length=100, blank=True, null=True)
    ownership = models.CharField(max_length=100, blank=True, null=True)

    drinking_water = models.BooleanField(blank=True, null=True)
    toilet = models.BooleanField(blank=True, null=True)
    electricity = models.BooleanField(blank=True, null=True)
    study_space = models.BooleanField(blank=True, null=True)

    class Meta:
        db_table = "socio_economic"