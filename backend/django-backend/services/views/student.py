from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend

from services.models.student import Student
from services.models.center import Center
from services.models.role import Role
from services.serializers.student import StudentSerializer
from services.permissions import IsAdminOrReadOnly


class StudentListView(generics.ListCreateAPIView):
    permission_classes = [IsAdminOrReadOnly]
    queryset = Student.objects.select_related('center', 'role').all()
    serializer_class = StudentSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['center__id', 'role__id']

    def get_queryset(self):
        queryset = super().get_queryset()
        center_id = self.request.query_params.get('center_id')
        role_id = self.request.query_params.get('role_id')
        if center_id is not None:
            queryset = queryset.filter(center__id=center_id)
        if role_id is not None:
            queryset = queryset.filter(role__id=role_id)
        return queryset


class StudentRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAdminOrReadOnly]
    queryset = Student.objects.select_related('center', 'role').all()
    serializer_class = StudentSerializer
