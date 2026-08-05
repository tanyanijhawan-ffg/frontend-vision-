from rest_framework import serializers

from services.models.student_profile import StudentProfile


class StudentProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentProfile
        fields = [
            'student_id', 'admission_number', 'center', 'roll_number',
            'first_name', 'middle_name', 'last_name',
            'gender', 'date_of_birth', 'blood_group',
            'nationality', 'religion', 'caste', 'student_photo',
            'email', 'mobile_number',
            'address_line1', 'address_line2', 'city', 'state', 'country', 'postal_code',
            'class_id', 'section_id',
            'admission_date', 'previous_school',
            'aadhar_number', 'birth_certificate_number',
            'emergency_contact_name', 'emergency_contact_number',
            'status', 'created_by', 'created_date',
            'modified_by', 'modified_date',
        ]
