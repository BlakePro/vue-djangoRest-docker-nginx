from django.core import serializers
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework.renderers import JSONRenderer
from .models import DataXML
from .serializers import XmlSerializer

class Hello(APIView):

    @classmethod
    def get_extra_actions(cls):
        return []

    def get(self, request, format=None):
        data = DataXML.objects.all()
        response = serializers.serialize("json", data)
        return HttpResponse(response, content_type="application/json")

    def post(self, request):

        data = JSONParser().parse(request)
        serializer = XmlSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response({"message": "error"})
