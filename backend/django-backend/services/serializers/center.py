from rest_framework import serializers

from services.models.center import Center


class CenterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Center
        fields = ['id', 'name', 'location']
