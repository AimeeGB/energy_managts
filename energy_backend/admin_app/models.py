from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

# Cliente Model

class Cliente(models.Model):
    username = models.CharField(max_length=200)
    password = models.CharField(max_length=200)
    nombre = models.CharField(max_length=200)
    apellido = models.CharField(max_length=200)
    email = models.CharField(max_length=200)
    area = models.CharField(max_length=200)
    
    def __str__(self):
        return self.nombre

# Agreements Model

class Agreements(models.Model):
    title = models.CharField(max_length=200)
    status = models.CharField(max_length=200)
    created_at = models.DateField(auto_now_add=True)
    end_at = models.DateField()
    client_id= models.ForeignKey(Cliente, on_delete=models.CASCADE)

    def __str__ (self):
        return self.title

    # def __unicode__ (self):
    #     return '%s' % (self.orden_time)   

# Inspecciones de la Empresa u Organismo Superior y Inspecciones de la ONURE Model

class Inspecciones(models.Model):
    inspeccion_time = models.DateField(auto_now_add=True)
    tipo_inspeccion = models.CharField(max_length=200)
    nombre_inpectores = models.CharField(max_length=200)
    deficiencias_violaciones  = models.TextField()
    plan_acciones  = models.TextField()
    client_id= models.ForeignKey(Cliente, on_delete=models.CASCADE)
    
    
    def __str__ (self):
        return self.tipo_inspeccion


    #leyenda:
    # ImpEnerg = importe de energía activa (kWh)
    # ExpEnerg = exporte de energía activa (kWh)
    # totalImpReacEnerg = Total importe de energía reactiva (kvarh)
    # ImpMaxDeman = importe activo maximo demandado (kW)
    # ExpMaxDeman =  exporte activo maximo demandado (kW)
    # imporActPoder = Importe activo de poder (kW)
    # exporActPoder = Exporte activo de poder (kW)
    # face*Volt = Face * de voltage (V)
    # face*Curr = Face * de corriente (A)
