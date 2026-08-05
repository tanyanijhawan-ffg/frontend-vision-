from rest_framework import serializers

from school.models.center import Center


class CenterSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source='centre_id', read_only=True)
    name = serializers.CharField(source='centre_name', read_only=True)
    district = serializers.CharField(source='district.district_name', read_only=True)
    region = serializers.CharField(source='region.region_name', read_only=True)
    location = serializers.CharField(source='block', read_only=True)

    class Meta:
        model = Center
        fields = ['id', 'name', 'district', 'region', 'location']
