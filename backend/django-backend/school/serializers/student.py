from rest_framework import serializers

from .center import CenterSerializer
from school.models.student import Student
from school.models.center import Center


class StudentSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source='student_id', read_only=True)
    first_name = serializers.SerializerMethodField()
    last_name = serializers.SerializerMethodField()
    email = serializers.SerializerMethodField()
    center = CenterSerializer(read_only=True, source='centre')
    role = serializers.SerializerMethodField()
    center_id = serializers.PrimaryKeyRelatedField(
        queryset=Center.objects.all(), write_only=True, source='centre'
    )
    joined_at = serializers.SerializerMethodField()

    class Meta:
        model = Student
        fields = [
            'id', 'first_name', 'last_name', 'email',
            'center', 'role', 'center_id', 'joined_at',
        ]

    def get_first_name(self, obj):
        parts = (obj.full_name or '').split(' ', 1)
        return parts[0] if parts else ''

    def get_last_name(self, obj):
        parts = (obj.full_name or '').split(' ', 1)
        return parts[1] if len(parts) > 1 else ''

    def get_email(self, obj):
        return ''

    def get_role(self, obj):
        return {'id': 1, 'name': obj.class_grade or 'Student'}

    def get_joined_at(self, obj):
        return obj.dob.isoformat() if obj.dob else None
