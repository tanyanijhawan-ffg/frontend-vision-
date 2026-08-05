from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend

from services.models.attendance import Attendance
from services.serializers.attendance import AttendanceSerializer
from services.permissions import IsAdminOrReadOnly


class AttendanceCreateView(generics.CreateAPIView):
    permission_classes = [IsAdminOrReadOnly]
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer


class AttendanceListView(generics.ListAPIView):
    permission_classes = [IsAdminOrReadOnly]
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
