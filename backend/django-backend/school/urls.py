from django.urls import path
from .views import (
    AttendanceCreateView,
    AttendanceListView,
    StudentListView,
    StudentProfileListCreateView,
    StudentProfileRetrieveUpdateDestroyView,
    StudentRetrieveUpdateDestroyView,
)

urlpatterns = [
    path('attendance/', AttendanceListView.as_view(), name='attendance-list'),
    path('attendance/record/', AttendanceCreateView.as_view(), name='attendance-create'),
    path('students/', StudentListView.as_view(), name='student-list'),
    path('students/<int:pk>/', StudentRetrieveUpdateDestroyView.as_view(), name='student-detail'),
    path('student-profiles/', StudentProfileListCreateView.as_view(), name='studentprofile-list'),
    path('student-profiles/<uuid:student_id>/', StudentProfileRetrieveUpdateDestroyView.as_view(), name='studentprofile-detail'),
]
