from rest_framework import serializers

from .center import CenterSerializer
from .role import RoleSerializer
from services.models.student import Student
from services.models.center import Center
from services.models.role import Role


class StudentSerializer(serializers.ModelSerializer):
    center = CenterSerializer(read_only=True)
    role = RoleSerializer(read_only=True)
    center_id = serializers.PrimaryKeyRelatedField(
        queryset=Center.objects.all(), write_only=True, source='center'
    )
    role_id = serializers.PrimaryKeyRelatedField(
        queryset=Role.objects.all(), write_only=True, source='role'
    )

    class Meta:
        model = Student
        fields = [
            'id', 'first_name', 'last_name', 'email',
            'center', 'role', 'center_id', 'role_id',
            'joined_at',
        ]
