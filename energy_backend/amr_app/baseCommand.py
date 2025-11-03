from django.core.management.base import BaseCommand
from app_contador.models import Contador, Datos
import pandas as pd
import os
from django.conf import settings
import patoolib
import datetime
import pytz


class Command(BaseCommand):
    help = 'Importa los datos del archivo xlsx para la base de datos'

    def add_arguments(self, parser):
        pass

    def handle(self, *args, **kwargs):
        ruta_carpeta = settings.XLSX_FILE_PATH

        if not os.path.isdir(ruta_carpeta):
            self.stderr.write(f"Error: La ruta '{ruta_carpeta}' no es una carpeta valida")
            return
        
        archivos_comprimidos = [f for f in os.listdir(ruta_carpeta) if f.endswith('.zip') or f.endswith('.rar')]
        tz_havana = pytz.timezone('America/Havana')

        for archivo in archivos_comprimidos:
            ruta_completa = os.path.join(ruta_carpeta, archivo)
            try:
                patoolib.extract_archive(ruta_completa, outdir=ruta_carpeta)
            except Exception as e:
                self.stderr.write(f'Error al descomprimir el archivo: {e}')

        archivos_xlsx = [f for f in os.listdir(ruta_carpeta) if f.endswith('.xlsx') or f.endswith('.xls')]

        for archivo in archivos_xlsx:
            try:
                ruta_completa = os.path.join(ruta_carpeta, archivo)
                df = pd.read_excel(ruta_completa)

                columnas_excel = df.columns
                
                columnas_dic = {
                    'región': None,
                    'número de cuenta': None,
                    'número de cliente': None,
                    'contador número': None,
                    'contador nombre': None,
                    'dirección del dispositivo': None,
                    'tiempo de captura': None,
                    'total import active energy (kwh)': None,
                    't1 import active energy (kwh)': None,
                    't2 import active energy (kwh)': None,
                    't3 import active energy (kwh)': None,
                    'total export active energy (kwh)': None,
                    't1 export active energy (kwh)': None,
                    't2 export active energy (kwh)': None,
                    't3 export active energy (kwh)': None,
                    'total import reactive energy (kvarh)': None,
                    't1 import active max demand (kw)': None,
                    't2 import active max demand (kw)': None,
                    't3 import active max demand (kw)': None,
                    't1 export active max demand (kw)': None,
                    't2 export active max demand (kw)': None,
                    't3 export active max demand (kw)': None,
                    'import active power (kw)': None,
                    'export active power (kw)': None,
                    'power factor': None,
                    'phase a voltage (v)': None,
                    'phase b voltage (v)': None,
                    'phase c voltage (v)': None,
                    'phase a current (a)': None,
                    'phase b current (a)': None,
                    'phase c current (a)': None
                }

                for columna in columnas_excel:
                    for nombre_columna, valor_columna in columnas_dic.items():
                        if nombre_columna.lower() in columna.lower():
                            columnas_dic[nombre_columna] = columna

                if None in columnas_dic.values():
                    self.stderr.write('Error: No se encontraron todas las columnas')
                    return
                
                for index, row in df.iterrows():
                    regionDat = row[columnas_dic['región']]
                    num_cuentaDat = row[columnas_dic['número de cuenta']]
                    num_clienteDat = row[columnas_dic['número de cliente']]
                    num_contDat = row[columnas_dic['contador número']]
                    nomb_contDat = row[columnas_dic['contador nombre']]
                    direccionDat = row[columnas_dic['dirección del dispositivo']]
                    tiempoDat = row[columnas_dic['tiempo de captura']]
                    total_impDat = row[columnas_dic['total import active energy (kwh)']]
                    t1_impDat = row[columnas_dic['t1 import active energy (kwh)']]
                    t2_impDat = row[columnas_dic['t2 import active energy (kwh)']]
                    t3_impDat = row[columnas_dic['t3 import active energy (kwh)']]
                    total_expDat = row[columnas_dic['total export active energy (kwh)']]
                    t1_expDat = row[columnas_dic['t1 export active energy (kwh)']]
                    t2_expDat = row[columnas_dic['t2 export active energy (kwh)']]
                    t3_expDat = row[columnas_dic['t3 export active energy (kwh)']]
                    total_reactDat = row[columnas_dic['total import reactive energy (kvarh)']]
                    t1_imaxDat = row[columnas_dic['t1 import active max demand (kw)']]
                    t2_imaxDat = row[columnas_dic['t2 import active max demand (kw)']]
                    t3_imaxDat = row[columnas_dic['t3 import active max demand (kw)']]
                    t1_emaxDat = row[columnas_dic['t1 export active max demand (kw)']]
                    t2_emaxDat = row[columnas_dic['t2 export active max demand (kw)']]
                    t3_emaxDat = row[columnas_dic['t3 export active max demand (kw)']]
                    imp_powerDat = row[columnas_dic['import active power (kw)']]
                    exp_powerDat = row[columnas_dic['export active power (kw)']]
                    powerDat = row[columnas_dic['power factor']]
                    A_voltDat = row[columnas_dic['phase a voltage (v)']]
                    B_voltDat = row[columnas_dic['phase b voltage (v)']]
                    C_voltDat = row[columnas_dic['phase c voltage (v)']]
                    A_currentDat = row[columnas_dic['phase a current (a)']]
                    B_currentDat = row[columnas_dic['phase b current (a)']]
                    C_currentDat = row[columnas_dic['phase c current (a)']]

            
                    tiempoDat = datetime.datetime.strptime(tiempoDat, '%Y-%m-%d %H:%M:%S')
                    tiempoDat = tz_havana.localize(tiempoDat).astimezone(pytz.utc)
                    tiempoDat = tiempoDat.replace(tzinfo=datetime.timezone.utc)
                    
                    try:
                        contador = Contador.objects.get(nombre_contador=nomb_contDat)
                    except Contador.DoesNotExist:
                        contador = Contador(
                            region=regionDat,
                            numero_cuenta=num_cuentaDat,
                            numero_cliente=num_clienteDat,
                            numero_contador=num_contDat,
                            nombre_contador=nomb_contDat,
                            direccion=direccionDat
                        )
                        contador.save()
                    
                    try:
                        dato = Datos.objects.get(contador=contador, tiempo_captura=tiempoDat)
                        dato.total_impE = total_impDat
                        dato.t1_impE = t1_impDat
                        dato.t2_impE = t2_impDat
                        dato.t3_impE = t3_impDat
                        dato.total_expE = total_expDat
                        dato.t1_expE = t1_expDat
                        dato.t2_expE = t2_expDat
                        dato.t3_expE = t3_expDat
                        dato.total_reactE = total_reactDat
                        dato.t1_impMax = t1_imaxDat
                        dato.t2_impMax = t2_imaxDat
                        dato.t3_impMax = t3_imaxDat
                        dato.t1_expMax = t1_emaxDat
                        dato.t2_expMax = t2_emaxDat
                        dato.t3_expMax = t3_emaxDat
                        dato.imp_act = imp_powerDat
                        dato.exp_act = exp_powerDat
                        dato.factor_poder = powerDat
                        dato.fase_Av = A_voltDat
                        dato.fase_Bv = B_voltDat
                        dato.fase_Cv = C_voltDat
                        dato.fase_Ac = A_currentDat
                        dato.fase_Bc = B_currentDat
                        dato.fase_Cc = C_currentDat
                        dato.save()
                    except Datos.DoesNotExist:
                        dato = Datos(
                            contador = contador,
                            tiempo_captura = tiempoDat,
                            total_impE = total_impDat,
                            t1_impE = t1_impDat,
                            t2_impE = t2_impDat,
                            t3_impE = t3_impDat,
                            total_expE = total_expDat,
                            t1_expE = t1_expDat,
                            t2_expE = t2_expDat,
                            t3_expE = t3_expDat,
                            total_reactE = total_reactDat,
                            t1_impMax = t1_imaxDat,
                            t2_impMax = t2_imaxDat,
                            t3_impMax = t3_imaxDat,
                            t1_expMax = t1_emaxDat,
                            t2_expMax = t2_emaxDat,
                            t3_expMax = t3_emaxDat,
                            imp_act = imp_powerDat,
                            exp_act = exp_powerDat,
                            factor_poder = powerDat,
                            fase_Av = A_voltDat,
                            fase_Bv = B_voltDat,
                            fase_Cv = C_voltDat,
                            fase_Ac = A_currentDat,
                            fase_Bc = B_currentDat,
                            fase_Cc = C_currentDat
                        )
                        dato.save()


            except Exception as e:
                self.stderr.write(f'Error al leer el archivo: {e}')
                return
    
        