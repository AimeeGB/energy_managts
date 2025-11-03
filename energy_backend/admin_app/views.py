# from django.shortcuts import render
from django.http.response import JsonResponse

from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views import View

from rest_framework import generics, permissions,pagination, viewsets, views
from rest_framework.response import Response
from rest_framework.decorators import action

from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework import status
from .pdf_utils import generate_inspection_pdf

from . import serializers
from . import models

import json
import bcrypt
import jwt
from .utils import decode_token
from datetime import timedelta
    
class RegisterView(views.APIView):
    @method_decorator(csrf_exempt)
    def post(self, request):
        
        data = json.loads(request.body)
        hashed_password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt()) #encriptar password

        cliente = models.Cliente(
            username=data['username'],
            password=hashed_password.decode('utf-8'),
            nombre=data['nombre'],
            apellido=data['apellido'],
            email=data['email'],
            area=data['area']
        )
        cliente.save()

        return JsonResponse({'message':'registro exitoso'}, status=201)
        # return JsonResponse({'message':'metodo no permitido'}, status=405)

class LoginView(views.APIView):
    @method_decorator(csrf_exempt)
    def post(self, request):
        data = json.loads(request.body)
        try:
            cliente = models.Cliente.objects.get(username=data['username'])
            if bcrypt.checkpw(data['password'].encode('utf-8'), cliente.password.encode('utf-8')):
                payload = {
                    'user_id': cliente.id
                }
                token = jwt.encode(payload, "jwtsecret", algorithm='HS256')  # Usando la clave directamente
                return JsonResponse({'message': 'inicio exitoso', 'token': token}, status=200)
            else:
                return JsonResponse({'message': 'contrasena incorrecta'}, status=401)
        except models.Cliente.DoesNotExist:
            return JsonResponse({'message': 'usuario no encontrado'}, status=404)

#Authorization Client

def get_authenticated_client(request):
    try:
        token = request.headers.get('Authorization').split(' ')[1]
        # Decodifica el token y obtén el user_id (esto dependerá de cómo estés manejando los tokens)
        client_id = decode_token(token)
        return models.Cliente.objects.get(id=client_id)
    except (IndexError, AttributeError, models.Cliente.DoesNotExist):
        return None


# Cliente   

class ClienteList(generics.ListCreateAPIView):
    queryset = models.Cliente.objects.all()
    serializer_class = serializers.ClienteSerializer

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get (self,request, pk=0):
        if (pk > 0):
            clientes = list(models.Cliente.objects.filter(id=pk).values())
            if len(clientes) > 0:
                cliente = clientes[0]
                datos = {'message': "Success", 'cliente': cliente}
            else:
                datos = {'message': "No se encontraron clientes..."}
            return JsonResponse(datos)
        else:
            clientes = list(models.Cliente.objects.values())
            if len(clientes) > 0:
                datos = {'message': 'Success', 'clientes':clientes}
            else:
                datos = {'message': "No se encontraron clientes..."}
            return JsonResponse(datos)

    def post (self,request):
        print(request.body)
        jd = json.loads(request.body)
        models.Cliente.objects.create(nombre=jd['nombre'], apellido=jd['apellido'],email=jd['email'], mobile=jd['mobile'], area=jd['area'])
        
        datos = {'message': 'Success'}
        return JsonResponse(datos)

    def put (self,request, pk):
        jd = json.loads(request.body)
        clientes = list(models.Cliente.objects.filter(id=pk).values())
        if len(clientes) > 0:
            cliente = models.Cliente.objects.get(id=pk)
            cliente.nombre=jd['nombre']
            cliente.apellido=jd['apellido']
            cliente.email=jd['email']
            cliente.mobile=jd['mobile']
            cliente.area=jd['area']
            cliente.save()
            datos = {'message': "Success"}
        else:
            datos = {'message': "No se encontraron clientes..."}
        return JsonResponse(datos)

    def delete (self,request, pk):
        clientes = list(models.Cliente.objects.filter(id=pk).values())
        if len(clientes) > 0:
            models.Cliente.objects.filter(id=pk).delete()
            datos = {'message': "Success"}
        else:
            datos = {'message': "No se encontraron clientes..."}
        return JsonResponse(datos)   

class ClienteDetail(generics.ListAPIView):
    queryset = models.Cliente.objects.all()
    serializer_class = serializers.ClienteDetailSerializer 

class ClienteProfileView(views.APIView):
    def get(self, request):
        cliente = get_authenticated_client(request)
        if not cliente:
            return JsonResponse({'message': 'Cliente no autenticado'}, status=401)

        serializer = serializers.ClienteDetailSerializer(cliente)
        return JsonResponse({'message': 'Success', 'cliente': serializer.data})

    def put(self, request):
        cliente = get_authenticated_client(request)
        if not cliente:
            return JsonResponse({'message': 'Cliente no autenticado'}, status=401)

        jd = json.loads(request.body)
        cliente.nombre = jd['nombre']
        cliente.apellido = jd['apellido']
        cliente.email = jd['email']
        # cliente.area = jd['area']
        cliente.save()
        serializer = serializers.ClienteDetailSerializer(cliente)
        return JsonResponse({'message': 'Success', 'cliente': serializer.data})

# Agreements

class AgreementsList(generics.ListCreateAPIView):
    queryset = models.Agreements.objects.all()
    serializer_class = serializers.AgreementsSerializer

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, pk=0):
        cliente = get_authenticated_client(request)
        if not cliente:
            return JsonResponse({'message': 'Cliente no autenticado'}, status=401)
        
        if pk > 0:
            acuerdos = list(models.Agreements.objects.filter(id=pk, client_id=cliente.id).values())
            if len(acuerdos) > 0:
                acuerdo = acuerdos[0]
                datos = {'message': 'Success', 'acuerdo': acuerdo}
            else:
                datos = {'message': 'No se encontraron acuerdos...'}
            return JsonResponse(datos)
        else:
            acuerdos = list(models.Agreements.objects.filter(client_id=cliente.id).values())
            if len(acuerdos) > 0:
                datos = {'message': 'Success', 'acuerdos': acuerdos}
            else:
                datos = {'message': 'No se encontraron acuerdos...'}
            return JsonResponse(datos)

    def post(self, request):
        cliente = get_authenticated_client(request)
        if not cliente:
            return JsonResponse({'message': 'Cliente no autenticado'}, status=401)

        jd = json.loads(request.body)
        models.Agreements.objects.create(
            title=jd['title'], 
            status=jd['status'], 
            end_at=jd['end_at'], 
            client_id=cliente
        )
        datos = {'message': 'Success'}
        return JsonResponse(datos)

    def put(self, request, pk):
        cliente = get_authenticated_client(request)
        if not cliente:
            return JsonResponse({'message': 'Cliente no autenticado'}, status=401)
        
        jd = json.loads(request.body)
        acuerdos = list(models.Agreements.objects.filter(id=pk, client_id=cliente.id).values())
        if len(acuerdos) > 0:
            acuerdo = models.Agreements.objects.get(id=pk)
            acuerdo.title = jd['title']
            acuerdo.status = jd['status']
            acuerdo.end_at = jd['end_at']
            acuerdo.save()
            datos = {'message': 'Success'}
        else:
            datos = {'message': 'No se encontraron acuerdos...'}
        return JsonResponse(datos)

    def delete(self, request, pk):
        cliente = get_authenticated_client(request)
        if not cliente:
            return JsonResponse({'message': 'Cliente no autenticado'}, status=401)
        
        acuerdos = list(models.Agreements.objects.filter(id=pk, client_id=cliente.id).values())
        if len(acuerdos) > 0:
            models.Agreements.objects.filter(id=pk).delete()
            datos = {'message': 'Success'}
        else:
            datos = {'message': 'No se encontraron acuerdos...'}
        return JsonResponse(datos)

class AgreementsDetail(generics.ListAPIView):
    queryset = models.Agreements.objects.all()
    serializer_class = serializers.AgreementsDetailSerializer

# Inspecciones

class InspeccionesList(generics.ListCreateAPIView):
    queryset = models.Inspecciones.objects.all()
    serializer_class = serializers.InspeccionesSerializer

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, pk=0):
        cliente = get_authenticated_client(request)
        if not cliente:
            return JsonResponse({'message': 'Cliente no autenticado'}, status=401)
        
        if pk > 0:
            inspecciones = list(models.Inspecciones.objects.filter(id=pk, client_id=cliente.id).values(
                'id',
                'tipo_inspeccion',
                'nombre_inpectores',
                'deficiencias_violaciones',
                'plan_acciones',
                'client_id',
                'inspeccion_time' 
            ))
            if len(inspecciones) > 0:
                inspeccion = inspecciones[0]
                datos = {'message': 'Success', 'inspeccion': inspeccion}
            else:
                datos = {'message': 'No se encontraron inspecciones...'}
            return JsonResponse(datos)
        else:
            inspecciones = list(models.Inspecciones.objects.filter(client_id=cliente.id).values())
            if len(inspecciones) > 0:
                datos = {'message': 'Success', 'inspecciones': inspecciones}
            else:
                datos = {'message': 'No se encontraron inspecciones...'}
            return JsonResponse(datos)

    def post(self, request):
        cliente = get_authenticated_client(request)
        if not cliente:
            return JsonResponse({'message': 'Cliente no autenticado'}, status=401)

        jd = json.loads(request.body)
        models.Inspecciones.objects.create(
            tipo_inspeccion=jd['tipo_inspeccion'], 
            nombre_inpectores=jd['nombre_inpectores'], 
            deficiencias_violaciones=jd['deficiencias_violaciones'], 
            plan_acciones=jd['plan_acciones'], 
            client_id=cliente
        )
        datos = {'message': 'Success'}
        return JsonResponse(datos)

    def put(self, request, pk):
        cliente = get_authenticated_client(request)
        if not cliente:
            return JsonResponse({'message': 'Cliente no autenticado'}, status=401)
        
        jd = json.loads(request.body)
        inspecciones = list(models.Inspecciones.objects.filter(id=pk, client_id=cliente.id).values())
        if len(inspecciones) > 0:
            inspeccion = models.Inspecciones.objects.get(id=pk)
            # inspeccion.tipo_inspeccion = jd['tipo_inspeccion']
            inspeccion.nombre_inpectores = jd['nombre_inpectores']
            inspeccion.deficiencias_violaciones = jd['deficiencias_violaciones']
            inspeccion.plan_acciones = jd['plan_acciones']
            inspeccion.save()
            datos = {'message': 'Success'}
        else:
            datos = {'message': 'No se encontraron inspecciones...'}
        return JsonResponse(datos)

    def delete(self, request, pk):
        cliente = get_authenticated_client(request)
        if not cliente:
            return JsonResponse({'message': 'Cliente no autenticado'}, status=401)
        
        inspecciones = list(models.Inspecciones.objects.filter(id=pk, client_id=cliente.id).values())
        if len(inspecciones) > 0:
            models.Inspecciones.objects.filter(id=pk).delete()
            datos = {'message': 'Success'}
        else:
            datos = {'message': 'No se encontraron inspecciones...'}
        return JsonResponse(datos)

class InspeccionesDetail(generics.ListAPIView):
    queryset = models.Inspecciones.objects.all()
    serializer_class = serializers.InspeccionesDetailSerializer

# class ExportInspeccionPDFView(APIView):
#     """Vista para exportar una inspección a PDF"""
    
#     def get(self, request, pk):
#         try:
#             # Obtener la inspección
#             inspeccion = models.Inspecciones.objects.get(pk=pk)
            
#             # Generar el PDF
#             pdf_content = generate_inspection_pdf(inspeccion)
            
#             # Crear respuesta con el PDF
#             response = HttpResponse(
#                 pdf_content,
#                 content_type='application/pdf'
#             )
            
#             # Configurar el nombre del archivo
#             filename = f"Inspeccion_{inspeccion.tipo_inspeccion}_{inspeccion.inspeccion_time.strftime('%Y-%m-%d')}.pdf"
#             response['Content-Disposition'] = f'attachment; filename="{filename}"'
            
#             return response
            
#         except models.Inspecciones.DoesNotExist:
#             return Response(
#                 {'error': 'Inspección no encontrada'},
#                 status=status.HTTP_404_NOT_FOUND
#             )
#         except Exception as e:
#             return Response(
#                 {'error': f'Error al generar el PDF: {str(e)}'},
#                 status=status.HTTP_500_INTERNAL_SERVER_ERROR
#             )
            
  