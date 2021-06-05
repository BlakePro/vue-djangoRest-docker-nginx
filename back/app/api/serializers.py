from rest_framework_json_api import serializers
from app.api.models import DataXML

class XmlSerializer(serializers.ModelSerializer):

    class Meta:
        model = DataXML
        fields = '__all__'
