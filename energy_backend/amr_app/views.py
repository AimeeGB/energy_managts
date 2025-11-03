from django.http import JsonResponse
from django.views import View
import pandas as pd
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.utils.timezone import make_aware
from django.core.paginator import Paginator


from . import serializers
from . import models

import pandas as pd
import pytz
from datetime import datetime, timedelta


#Add Data Base

@method_decorator(csrf_exempt, name='dispatch')
class UploadXLSXView(View):
    def post(self, request, *args, **kwargs):
        if 'file' not in request.FILES:
            return JsonResponse({'error': 'No se proporcionó un archivo'}, status=400)

        file = request.FILES['file']
        try:
            df = pd.read_excel(file)
            havana_tz = pytz.timezone('America/Havana')

            #Ordenar los el dataFrame ppr el tiempo decaptura de menor a mayor

            df.sort_values(by='Tiempo de captura', ascending=True, inplace=True)

            for _, row in df.iterrows():
                # Crear o actualizar AMRContador
                contador, created = models.AMRContador.objects.get_or_create(
                    numeroContador=row.get('Contador Número'),
                    defaults={
                        'region': row.get('Región'),
                        'numeroCuenta': row.get('Número de cuenta'),
                        'numeroCliente': row.get('Número de cliente'),
                        'direccionDispositivo': row.get('Dirección del dispositivo'),
                        'nombreContador': row.get('Contador Nombre'),
                    }
                )

                #Procesar la fecha y hora para agregar zona horaria
                tmp_lectura=row.get('Tiempo de captura')
                if pd.notna(tmp_lectura):        #asegurate de que no sea NaN
                    if isinstance(tmp_lectura, str):
                        tmp_lectura = datetime.strptime(tmp_lectura, '%Y-%m-%d %H:%M:%S')
                    tmp_lectura = havana_tz.localize(tmp_lectura).astimezone(pytz.UTC)  #convertir a utc

                # Crear registro en AMRDatos
                models.AMRDatos.objects.create(
                    amrContador=contador,
                    tmpLectura=tmp_lectura,
                    totalImpEnerg=row.get('Total import active energy (kWh)'),
                    t1ImpEnerg=row.get('T1 import active energy (kWh)'),
                    t2ImpEnerg=row.get('T2 import active energy (kWh)'),
                    t3ImpEnerg=row.get('T3 import active energy (kWh)'),
                    totalExpEnerg=row.get('Total export active energy (kWh)'),
                    t1ExpEnerg=row.get('T1 export active energy (kWh)'),
                    t2ExpEnerg=row.get('T2 export active energy (kWh)'),
                    t3ExpEnerg=row.get('T3 export active energy (kWh)'),
                    totalImpReacEnerg=row.get('Total import reactive energy (kvarh)'),
                    t1ImpMaxDeman=row.get('T1 import active max demand (kW)'),
                    t2ImpMaxDeman=row.get('T2 import active max demand (kW)'),
                    t3ImpMaxDeman=row.get('T3 import active max demand (kW)'),
                    t1ExpMaxDeman=row.get('T1 export active max demand (kW)'),
                    t2ExpMaxDeman=row.get('T2 export active max demand (kW)'),
                    t3ExpMaxDeman=row.get('T3 export active max demand (kW)'),
                    imporActPoder=row.get('Import active power (kW)'),
                    exporActPoder=row.get('Export active power (kW)'),
                    factPoder=row.get('Power factor'),
                    faceAVolt=row.get('Phase A voltage (V)'),
                    faceBVolt=row.get('Phase B voltage (V)'),
                    faceCVolt=row.get('Phase C voltage (V)'),
                    faceACurr=row.get('Phase A current (A)'),
                    faceBCurr=row.get('Phase B current (A)'),
                    faceCCurr=row.get('Phase C current (A)'),
                )

            return JsonResponse({'message': 'Archivo procesado correctamente'}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)


# @method_decorator(csrf_exempt, name='dispatch')
# class GetContadorDataView(View):
#     def get(self, request, *args, **kwargs):
#         contador_numero = request.GET.get('contador_numero', '873014120331')
#         intervalo = int(request.GET.get('intervalo', '1'))  # Default: cada 15 minutos (salto = 1)

#         try:
#             contador = models.AMRContador.objects.get(numeroContador=contador_numero)
#             datos = models.AMRDatos.objects.filter(amrContador=contador).order_by('tmpLectura')

#             if not datos.exists():
#                 return JsonResponse({'message': 'Contador no encontrado'}, status=404)
            
#             havana_tz = pytz.timezone('America/Havana')
            
#             #FILTRO SIMPLE
#             # # Calcular las diferencias entre los valores consecutivos
#             # diferencias = []

#             # for i in range(1, len(datos)):

#             #     fecha_lectura_local = datos[i].tmpLectura.astimezone(havana_tz).strftime('%Y-%m-%d %H:%M:%S')

#             #     diferencia = (datos[i].totalImpEnerg - datos[i-1].totalImpEnerg) * 10

#             #     diferencia_corregida = int(diferencia) if diferencia.is_integer() else round (diferencia, 2)
#             #     diferencias.append({
#             #         # 'fecha_lectura': datos[i].tmpLectura.strftime('%Y-%m-%d %H:%M:%S'),
#             #         # 'diferencia_importe': diferencia
#             #         'fecha_lectura': fecha_lectura_local,
#             #         'diferencia_importe': diferencia_corregida
#             #     })

#             # #FILTRO CON VARIANTES DE 0
#             # # Generar diferencias de importes con las fechas ajustadas
#             # diferencias = []
#             # ultimo_valor_no_nulo = None  # Para rastrear el último valor no nulo

#             # for i in range(0, len(datos)):
#             #     actual = datos[i]

#             #     # Convertir `tmpLectura` a la zona horaria local
#             #     fecha_local = actual.tmpLectura.astimezone(havana_tz).strftime('%Y-%m-%d %H:%M:%S')

#             #     # Calcular la diferencia
#             #     if actual.totalImpEnerg == 0:
#             #         # Si el valor es 0, la diferencia también es 0
#             #         diferencia_corregida = 0
#             #     else:
#             #         # Si no es 0, calcular diferencia respecto al último valor no nulo
#             #         if ultimo_valor_no_nulo is None:
#             #             # Primera iteración o si no se ha encontrado un valor previo
#             #             diferencia_corregida = 0
#             #         else:
#             #             diferencia = (actual.totalImpEnerg - ultimo_valor_no_nulo) * 10
#             #             diferencia_corregida = int(diferencia) if diferencia.is_integer() else round(diferencia, 2)

#             #         # Actualizar el último valor no nulo
#             #         ultimo_valor_no_nulo = actual.totalImpEnerg

#             #     diferencias.append({
#             #         'fecha_lectura': fecha_local,
#             #         'diferencia_importe': diferencia_corregida
#             #     })

#             # Generar diferencias de importes con las fechas ajustadas
#             diferencias = []
#             ultimo_valor_no_nulo = None  # Para rastrear el último valor no nulo

#             for i in range(0, len(datos), intervalo):  # Salto según el intervalo
#                 actual = datos[i]

#                 # Convertir `tmpLectura` a la zona horaria local
#                 fecha_local = actual.tmpLectura.astimezone(havana_tz).strftime('%Y-%m-%d %H:%M:%S')

#                 # Calcular la diferencia
#                 if actual.totalImpEnerg == 0:
#                     diferencia_corregida = 0
#                 else:
#                     if ultimo_valor_no_nulo is None:
#                         diferencia_corregida = 0
#                     else:
#                         diferencia = (actual.totalImpEnerg - ultimo_valor_no_nulo) * 10
#                         diferencia_corregida = int(diferencia) if diferencia.is_integer() else round(diferencia, 2)

#                     # Actualizar el último valor no nulo
#                     ultimo_valor_no_nulo = actual.totalImpEnerg

#                 diferencias.append({
#                     'fecha_lectura': fecha_local,
#                     'diferencia_importe': diferencia_corregida
#                 })
            
#             return JsonResponse(diferencias, safe=False)
#         except models.AMRContador.DoesNotExist:
#             return JsonResponse({'error': 'Contador no encontrado'}, status=404)

# Contador Número	= Contador Nombre
# 873015091845	= LABORATORIO TEC. UNIVERSIDAD.
# 873014120331	= INST. SUPERIOR PEDAGOGICO J. MARTI
# 873015091891	= AREA CULTURAL. UNIV. CAMAGUEY.  (UNIVERSIDAD)
# 873017030830	= COCINA UNIVERSIDAD
# 873017030879	= FAC. DE CIENCIA ANIMAL. (UNIVERSIDAD)
# 873017031746	= FAC. PREPARATORIA. (UNIVERSIDAD)


class BaseContadorDataView(View):
    def obtener_datos_contador(self, contador_numero, intervalo, ultimas_24_horas=False, fecha_especifica=None):
        try:
            contador = models.AMRContador.objects.get(numeroContador=contador_numero)
            datos = models.AMRDatos.objects.filter(amrContador=contador).order_by('tmpLectura')

            if not datos.exists():
                return {'error': 'Contador no encontrado'}, 404

            # Determinar la última fecha registrada
            ultima_fecha_registrada = datos.last().tmpLectura
            fecha_defecto = ultima_fecha_registrada.strftime('%Y-%m-%d')

            # Filtro por las últimas 24 horas
            if ultimas_24_horas:
                limite_inferior = ultima_fecha_registrada - timedelta(hours=24)
                datos = datos.filter(tmpLectura__gte=limite_inferior)

            # Filtro por fecha específica
            elif fecha_especifica:
                fecha_inicio = datetime.strptime(fecha_especifica, "%Y-%m-%d")
                fecha_fin = fecha_inicio + timedelta(days=1)
                datos = datos.filter(tmpLectura__gte=fecha_inicio, tmpLectura__lt=fecha_fin)

            # Por defecto, mostrar los datos de la última fecha registrada
            else:
                fecha_inicio = ultima_fecha_registrada.replace(hour=0, minute=0, second=0, microsecond=0)
                fecha_fin = fecha_inicio + timedelta(days=1)
                datos = datos.filter(tmpLectura__gte=fecha_inicio, tmpLectura__lt=fecha_fin)

            havana_tz = pytz.timezone('America/Havana')
            diferencias = []
            ultimo_valor_no_nulo = None  # Para rastrear el último valor no nulo
            primer_valor = True  # Ignorar el primer valor

            for i in range(0, len(datos), intervalo):  # Salto según el intervalo
                actual = datos[i]
                # Convertir la fecha al formato "HH:mm"
                fecha_local = actual.tmpLectura.astimezone(havana_tz).strftime('%H:%M')

                if actual.totalImpEnerg == 0:
                    diferencia_corregida = 0
                else:
                    if ultimo_valor_no_nulo is None:
                        diferencia_corregida = 0
                    else:
                        diferencia = (actual.totalImpEnerg - ultimo_valor_no_nulo) * 10
                        diferencia_corregida = int(diferencia) if diferencia.is_integer() else round(diferencia, 2)

                    ultimo_valor_no_nulo = actual.totalImpEnerg

                # Ignorar la primera fila (primer valor con diferencia = 0)
                if primer_valor:
                    primer_valor = False
                    continue

                diferencias.append({
                    'fecha_lectura': fecha_local,  # Solo HH:mm
                    'diferencia_importe': diferencia_corregida
                })

            # Retornar datos junto con la fecha graficada
            return {
                'diferencias': diferencias,
                'fecha_grafico': fecha_especifica if fecha_especifica else fecha_defecto  # Formato %Y-%m-%d
            }, 200

        except models.AMRContador.DoesNotExist:
            return {'error': 'Contador no encontrado'}, 404


# @method_decorator(csrf_exempt, name='dispatch')
# class INST_SUPERIOR_PEDAGOGICO_DataView(BaseContadorDataView):
#     def get(self, request, *args, **kwargs):
#         contador_numero = request.GET.get('contador_numero', '873014120331')
#         intervalo = int(request.GET.get('intervalo', '1'))

#         ultimas_24_horas = request.GET.get('ultimas_24_horas', 'false').lower() == 'true'
#         fecha_especifica = request.GET.get('fecha_especifica', None)

#         response_data, status = self.obtener_datos_contador(contador_numero, intervalo, ultimas_24_horas=ultimas_24_horas, fecha_especifica=fecha_especifica)
#         return JsonResponse(response_data, safe=False, status=status)

# @method_decorator(csrf_exempt, name='dispatch')
# class LABORATORIO_TEC_DataView(BaseContadorDataView):
#     def get(self, request, *args, **kwargs):
#         contador_numero = request.GET.get('contador_numero', '873015091845')
#         intervalo = int(request.GET.get('intervalo', '1'))
        
#         ultimas_24_horas = request.GET.get('ultimas_24_horas', 'false').lower() == 'true'
#         fecha_especifica = request.GET.get('fecha_especifica', None)

#         response_data, status = self.obtener_datos_contador(contador_numero, intervalo, ultimas_24_horas=ultimas_24_horas, fecha_especifica=fecha_especifica)
#         return JsonResponse(response_data, safe=False, status=status)

# @method_decorator(csrf_exempt, name='dispatch')
# class AREA_CULTURAL_DataView(BaseContadorDataView):
#     def get(self, request, *args, **kwargs):
#         contador_numero = request.GET.get('contador_numero', '873015091891')
#         intervalo = int(request.GET.get('intervalo', '1'))
        
#         ultimas_24_horas = request.GET.get('ultimas_24_horas', 'false').lower() == 'true'
#         fecha_especifica = request.GET.get('fecha_especifica', None)

#         response_data, status = self.obtener_datos_contador(contador_numero, intervalo, ultimas_24_horas=ultimas_24_horas, fecha_especifica=fecha_especifica)
#         return JsonResponse(response_data, safe=False, status=status)

# @method_decorator(csrf_exempt, name='dispatch')
# class COCINA_UNIVERSIDAD_DataView(BaseContadorDataView):
#     def get(self, request, *args, **kwargs):
#         contador_numero = request.GET.get('contador_numero', '873017030830')
#         intervalo = int(request.GET.get('intervalo', '1'))
        
#         ultimas_24_horas = request.GET.get('ultimas_24_horas', 'false').lower() == 'true'
#         fecha_especifica = request.GET.get('fecha_especifica', None)

#         response_data, status = self.obtener_datos_contador(contador_numero, intervalo, ultimas_24_horas=ultimas_24_horas, fecha_especifica=fecha_especifica)
#         return JsonResponse(response_data, safe=False, status=status)
    
# @method_decorator(csrf_exempt, name='dispatch')
# class FAC_CIENCIA_ANIMAL_DataView(BaseContadorDataView):
#     def get(self, request, *args, **kwargs):
#         contador_numero = request.GET.get('contador_numero', '873017030879')
#         intervalo = int(request.GET.get('intervalo', '1'))
        
#         ultimas_24_horas = request.GET.get('ultimas_24_horas', 'false').lower() == 'true'
#         fecha_especifica = request.GET.get('fecha_especifica', None)

#         response_data, status = self.obtener_datos_contador(contador_numero, intervalo, ultimas_24_horas=ultimas_24_horas, fecha_especifica=fecha_especifica)
#         return JsonResponse(response_data, safe=False, status=status)
    
# @method_decorator(csrf_exempt, name='dispatch')
# class FAC_PREPARATORIA_DataView(BaseContadorDataView):
#     def get(self, request, *args, **kwargs):
#         contador_numero = request.GET.get('contador_numero', '873017031746')
#         intervalo = int(request.GET.get('intervalo', '1'))
        
#         ultimas_24_horas = request.GET.get('ultimas_24_horas', 'false').lower() == 'true'
#         fecha_especifica = request.GET.get('fecha_especifica', None)

#         response_data, status = self.obtener_datos_contador(contador_numero, intervalo, ultimas_24_horas=ultimas_24_horas, fecha_especifica=fecha_especifica)
#         return JsonResponse(response_data, safe=False, status=status)
    
@method_decorator(csrf_exempt, name='dispatch')
class AMRContadorListView(View):
    def get(self, request, *args, **kwargs):
        try:
            contadores = models.AMRContador.objects.all().values('id', 'numeroContador', 'nombreContador')
            return JsonResponse(list(contadores), safe=False, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

@method_decorator(csrf_exempt, name='dispatch')
class AMRGenericDataView(BaseContadorDataView):
    def get(self, request, *args, **kwargs):
        contador_numero = request.GET.get('contador_numero')
        if not contador_numero:
            return JsonResponse({'error': 'contador_numero parameter is required'}, status=400)
        
        intervalo = int(request.GET.get('intervalo', '1'))
        ultimas24Horas = request.GET.get('ultimas_24_horas', 'false').lower() == 'true'
        fecha_especifica = request.GET.get('fecha_especifica', None)
        
        response_data, status = self.obtener_datos_contador(
            contador_numero, intervalo, 
            ultimas_24_horas=ultimas24Horas, 
            fecha_especifica=fecha_especifica
        )
        return JsonResponse(response_data, safe=False, status=status)