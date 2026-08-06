from django.db import models
from .student import Student

class Motivation(models.Model):
    motivation_id = models.AutoField(primary_key=True)

    student = models.ForeignKey(
        Student,
        on_delete=models.CASCADE,
        related_name="motivations"
    )

    category = models.CharField(max_length=100, blank=True, null=True)
    reason = models.TextField(blank=True, null=True)
    narrative = models.TextField(blank=True, null=True)

    class Meta:
        db_table = "motivation"