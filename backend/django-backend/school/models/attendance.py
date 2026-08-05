from django.db import models

from .student import Student


class Attendance(models.Model):
    attendance_id = models.AutoField(primary_key=True)
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='attendances')
    attendance_date = models.DateField()
    status = models.CharField(max_length=20, blank=True, null=True)
    time_in = models.TimeField(blank=True, null=True)
    time_out = models.TimeField(blank=True, null=True)
    absence_reason = models.TextField(blank=True, null=True)
    participation_level = models.CharField(max_length=100, blank=True, null=True)
    attention_level = models.CharField(max_length=100, blank=True, null=True)
    behaviour = models.CharField(max_length=100, blank=True, null=True)
    tutor_observation = models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'attendance'

    def __str__(self):
        return f'{self.student} - {self.attendance_date}'


class LearningBehaviour(models.Model):
    behaviour_id = models.AutoField(primary_key=True)
    attendance = models.ForeignKey(Attendance, on_delete=models.CASCADE, related_name='learning_behaviours')
    homework_completed = models.BooleanField(default=False)
    classwork_completed = models.BooleanField(default=False)
    asked_questions = models.BooleanField(default=False)
    helped_others = models.BooleanField(default=False)

    class Meta:
        db_table = 'learning_behaviour'


class AcademicAssessment(models.Model):
    assessment_id = models.AutoField(primary_key=True)
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='academic_assessments')
    assessment_type = models.CharField(max_length=100, blank=True, null=True)
    assessment_date = models.DateField(blank=True, null=True)
    total = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    percentage = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    learning_behaviour = models.CharField(max_length=100, blank=True, null=True)
    narrative = models.TextField(blank=True, null=True)
    intervention_plan = models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'academic_assessment'


class SubjectScore(models.Model):
    subject_score_id = models.AutoField(primary_key=True)
    assessment = models.ForeignKey(AcademicAssessment, on_delete=models.CASCADE, related_name='subject_scores')
    subject_name = models.CharField(max_length=100, blank=True, null=True)
    marks = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    understanding_level = models.CharField(max_length=100, blank=True, null=True)
    application_ability = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        db_table = 'subject_score'
