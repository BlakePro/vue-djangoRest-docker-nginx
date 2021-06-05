from django.db import models

# Create your models here.
class DataXML(models.Model):
    nombre = models.CharField(max_length=300, blank=False)
    rfc = models.CharField(max_length=13, blank=False)
    xml_base64 = models.TextField(blank=False, null=False)
    status = models.BooleanField(default=True)

    def __str__(self):
        return self.name
