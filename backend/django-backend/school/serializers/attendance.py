from rest_framework import serializers

from school.models.attendance import Attendance
from school.models.student import Student
from school.serializers.student import StudentSerializer


class AttendanceSerializer(serializers.ModelSerializer):
    student = StudentSerializer(read_only=True)
    student_id = serializers.PrimaryKeyRelatedField(
        queryset=Student.objects.all(), write_only=True, source='student'
    )

    class Meta:
        model = Attendance
        fields = ['id', 'student', 'student_id', 'date', 'present', 'note']
