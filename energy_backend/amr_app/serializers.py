from rest_framework import serializers
from . import models

#ARM__Contador_Datos_Models

class AMRContadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.AMRContador
        fields = '__all__'

class AMRDatosSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.AMRDatos
        fields = '__all__'