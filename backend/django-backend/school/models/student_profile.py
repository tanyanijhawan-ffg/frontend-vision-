import uuid

from django.db import models

from .center import Center


class StudentProfile(models.Model):
    student_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    admission_number = models.CharField(max_length=20, unique=True)
    center = models.ForeignKey(Center, on_delete=models.CASCADE, related_name='student_profiles')
    roll_number = models.CharField(max_length=20, blank=True, null=True)

    first_name = models.CharField(max_length=100)
    middle_name = models.CharField(max_length=100, blank=True, null=True)
    last_name = models.CharField(max_length=100)

    gender = models.CharField(max_length=20, blank=True, null=True)
    date_of_birth = models.DateField()

    blood_group = models.CharField(max_length=5, blank=True, null=True)

    nationality = models.CharField(max_length=50, blank=True, null=True)
    religion = models.CharField(max_length=50, blank=True, null=True)
    caste = models.CharField(max_length=50, blank=True, null=True)

    student_photo = models.CharField(max_length=255, blank=True, null=True)

    email = models.EmailField(max_length=150, blank=True, null=True)
    mobile_number = models.CharField(max_length=20, blank=True, null=True)

    address_line1 = models.CharField(max_length=255, blank=True, null=True)
    address_line2 = models.CharField(max_length=255, blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    state = models.CharField(max_length=100, blank=True, null=True)
    country = models.CharField(max_length=100, blank=True, null=True)
    postal_code = models.CharField(max_length=20, blank=True, null=True)

    class_id = models.UUIDField(blank=True, null=True)
    section_id = models.UUIDField(blank=True, null=True)

    admission_date = models.DateField()
    previous_school = models.CharField(max_length=200, blank=True, null=True)

    aadhar_number = models.CharField(max_length=20, blank=True, null=True)
    birth_certificate_number = models.CharField(max_length=50, blank=True, null=True)

    emergency_contact_name = models.CharField(max_length=150, blank=True, null=True)
    emergency_contact_number = models.CharField(max_length=20, blank=True, null=True)

    status = models.CharField(max_length=20, default='ACTIVE')

    created_by = models.CharField(max_length=100, blank=True, null=True)
    created_date = models.DateTimeField(auto_now_add=True)

    modified_by = models.CharField(max_length=100, blank=True, null=True)
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'student_profile'

    def __str__(self):
        return f'{self.admission_number} - {self.first_name} {self.last_name}'
