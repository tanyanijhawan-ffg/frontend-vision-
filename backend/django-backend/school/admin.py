from django.contrib import admin
from .models import Attendance, Center, Role, Student, StudentProfile


@admin.register(Center)
class CenterAdmin(admin.ModelAdmin):
    list_display = ('centre_id', 'centre_name', 'block', 'status')
    search_fields = ('centre_name', 'block', 'village')


@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)


@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('student_id', 'full_name', 'gender', 'age', 'centre')
    list_filter = ('gender', 'centre')
    search_fields = ('full_name', 'nick_name', 'school_name')


@admin.register(StudentProfile)
class StudentProfileAdmin(admin.ModelAdmin):
    list_display = ('student_id', 'admission_number', 'first_name', 'last_name', 'center', 'status', 'admission_date')
    list_filter = ('center', 'status', 'gender')
    search_fields = ('admission_number', 'first_name', 'last_name', 'email', 'mobile_number')


@admin.register(Attendance)
class AttendanceAdmin(admin.ModelAdmin):
    list_display = ('attendance_id', 'student', 'attendance_date', 'status')
    list_filter = ('status', 'attendance_date', 'student__centre')
    search_fields = ('student__full_name',)
