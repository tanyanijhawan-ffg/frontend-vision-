from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend

from services.models.student_profile import StudentProfile
from services.serializers.student_profile import StudentProfileSerializer
from services.permissions import IsAdminOrReadOnly


class StudentProfileListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAdminOrReadOnly]
    queryset = StudentProfile.objects.select_related('center').all()
    serializer_class = StudentProfileSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['center__id', 'gender', 'status', 'class_id', 'section_id']

    def get_queryset(self):
        queryset = super().get_queryset()
        center_id = self.request.query_params.get('center_id')
        gender = self.request.query_params.get('gender')
        status = self.request.query_params.get('status')
        if center_id is not None:
            queryset = queryset.filter(center__id=center_id)
        if gender is not None:
            queryset = queryset.filter(gender__iexact=gender)
        if status is not None:
            queryset = queryset.filter(status__iexact=status)
        return queryset


class StudentProfileRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAdminOrReadOnly]
    queryset = StudentProfile.objects.select_related('center').all()
    serializer_class = StudentProfileSerializer
    lookup_field = 'student_id'
