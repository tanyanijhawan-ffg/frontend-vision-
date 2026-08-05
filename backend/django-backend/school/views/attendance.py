from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import AllowAny

from school.models.attendance import Attendance
from school.serializers.attendance import AttendanceSerializer


class AttendanceCreateView(generics.CreateAPIView):
    permission_classes = [AllowAny]
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer


class AttendanceListView(generics.ListAPIView):
    permission_classes = [AllowAny]
    queryset = Attendance.objects.select_related('student', 'student__center', 'student__role').all()
    serializer_class = AttendanceSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['date', 'present', 'student__center__id', 'student__role__id']

    def get_queryset(self):
        queryset = super().get_queryset()
        center_id = self.request.query_params.get('center_id')
        role_id = self.request.query_params.get('role_id')
        if center_id is not None:
            queryset = queryset.filter(student__center__id=center_id)
        if role_id is not None:
            queryset = queryset.filter(student__role__id=role_id)
        return queryset
