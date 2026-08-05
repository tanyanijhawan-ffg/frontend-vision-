from .attendance import AttendanceCreateView, AttendanceListView
from .student import StudentListView, StudentRetrieveUpdateDestroyView
from .student_profile import StudentProfileListCreateView, StudentProfileRetrieveUpdateDestroyView

__all__ = [
    'AttendanceCreateView',
    'AttendanceListView',
    'StudentListView',
    'StudentRetrieveUpdateDestroyView',
    'StudentProfileListCreateView',
    'StudentProfileRetrieveUpdateDestroyView',
]
