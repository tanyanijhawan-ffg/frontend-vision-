from rest_framework import generics
from rest_framework.permissions import AllowAny
from django_filters.rest_framework import DjangoFilterBackend

from school.models.student import Student
from school.serializers.student import StudentSerializer


class StudentListView(generics.ListCreateAPIView):
    permission_classes = [AllowAny]
    queryset = Student.objects.select_related('centre').all()
    serializer_class = StudentSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['centre__centre_id']

    def get_queryset(self):
        queryset = super().get_queryset()
        center_id = self.request.query_params.get('center_id')
        if center_id is not None:
            queryset = queryset.filter(centre__centre_id=center_id)
        return queryset


class StudentRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [AllowAny]
    queryset = Student.objects.select_related('centre').all()
    serializer_class = StudentSerializer
