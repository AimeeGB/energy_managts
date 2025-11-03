from rest_framework import serializers
from . import models

# Cliente Model

class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Cliente
        fields = ['id','nombre','apellido','email','area']

    def __init__(self, *args, **kwargs):
        super(ClienteSerializer, self).__init__(*args, **kwargs)
        self.Meta.depth = 1

class ClienteDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Cliente
        fields = ['id','nombre','apellido','email','area']

    def __init__(self, *args, **kwargs):
        super(ClienteDetailSerializer, self).__init__(*args, **kwargs)
        self.Meta.depth = 1


# Agreements Model

class AgreementsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Agreements
        fields = ['id','title','status','end_at','client_id']

    def __init__(self, *args, **kwargs):
        super(AgreementsSerializer, self).__init__(*args, **kwargs)
        self.Meta.depth = 1

class AgreementsDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Agreements
        fields = ['id','title','status','end_at','client_id']

    def __init__(self, *args, **kwargs):
        super(AgreementsDetailSerializer, self).__init__(*args, **kwargs)
        self.Meta.depth = 1

# Inspecciones Model

class InspeccionesSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Inspecciones
        fields = ['id','tipo_inspeccion','nombre_inpectores','deficiencias_violaciones','plan_acciones','client_id']

    def __init__(self, *args, **kwargs):
        super(InspeccionesSerializer, self).__init__(*args, **kwargs)
        self.Meta.depth = 1

class InspeccionesDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Inspecciones
        fields = ['id','tipo_inspeccion','nombre_inpectores','deficiencias_violaciones','plan_acciones','client_id']

    def __init__(self, *args, **kwargs):
        super(InspeccionesDetailSerializer, self).__init__(*args, **kwargs)
        self.Meta.depth = 1

