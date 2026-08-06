from django.db import models
from .student import Student

class Aspiration(models.Model):
    aspiration_id = models.AutoField(primary_key=True)

    student = models.ForeignKey(
        Student,
        on_delete=models.CASCADE,
        related_name="aspirations"
    )

    career_goal = models.CharField(max_length=255, blank=True, null=True)
    interests = models.TextField(blank=True, null=True)
    strengths = models.TextField(blank=True, null=True)

    class Meta:
        db_table = "aspiration"