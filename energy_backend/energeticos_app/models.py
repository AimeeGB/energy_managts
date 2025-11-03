from django.db import models
from django.utils.text import slugify
from decimal import Decimal
from django.core.validators import MinValueValidator, MaxValueValidator


PROVINCIAS = [
    ('Pinar del Río', 'Pinar del Río'),
    ('Artemisa', 'Artemisa'),
    ('La Habana', 'La Habana'),
    ('Mayabeque', 'Mayabeque'),
    ('Matanzas', 'Matanzas'),
    ('Cienfuegos', 'Cienfuegos'),
    ('Villa Clara', 'Villa Clara'),
    ('Sancti Spíritus', 'Sancti Spíritus'),
    ('Ciego de Ávila', 'Ciego de Ávila'),
    ('Camagüey', 'Camagüey'),
    ('Las Tunas', 'Las Tunas'),
    ('Holguín', 'Holguín'),
    ('Granma', 'Granma'),
    ('Santiago de Cuba', 'Santiago de Cuba'),
    ('Guantánamo', 'Guantánamo'),
]

MUNICIPIOS = {
    'Pinar del Río': [
            'Consolación del Sur', 'Guane', 'La Palma', 'Los Palacios', 
            'Mantua', 'Minas de Matahambre', 'Pinar del Río', 
            'San Juan y Martínez', 'San Luis', 'Sandino', 'Viñales'
        ],
    
    'Artemisa': [
            'Alquízar', 'Artemisa', 'Bauta', 'Caimito', 'Guanajay', 
            'Güira de Melena', 'Mariel', 'San Antonio de los Baños', 
            'Bahía Honda', 'Candelaria', 'San Cristóbal'
        ],
    
    'La Habana': [
            'Arroyo Naranjo', 'Boyeros', 'Centro Habana', 'Cerro', 'Cotorro', 
            'Diez de Octubre', 'Guanabacoa', 'La Habana del Este', 
            'La Habana Vieja', 'La Lisa', 'Marianao', 'Playa', 
            'Plaza de la Revolución', 'Regla', 'San Miguel del Padrón'
        ],
    
    'Mayabeque': [
            'Batabanó', 'Bejucal', 'Güines', 'Jaruco', 'Madruga', 
            'Melena del Sur', 'Nueva Paz', 'Quivicán', 
            'San José de las Lajas', 'Santa Cruz del Norte'
        ],
    
    'Matanzas': [
            'Calimete', 'Cárdenas', 'Ciénaga de Zapata', 'Colón', 
            'Jagüey Grande', 'Jovellanos', 'Limonar', 'Los Arabos', 
            'Martí', 'Matanzas', 'Pedro Betancourt', 'Perico', 'Unión de Reyes'
        ],
    
    'Cienfuegos': [
            'Abreus', 'Aguada de Pasajeros', 'Cienfuegos', 'Cruces', 
            'Cumanayagua', 'Lajas', 'Palmira', 'Rodas'
        ],
    
    'Villa Clara': [
            'Caibarién', 'Camajuaní', 'Cifuentes', 'Corralillo', 
            'Encrucijada', 'Manicaragua', 'Placetas', 'Quemado de Güines', 
            'Ranchuelo', 'Remedios', 'Sagua la Grande', 'Santa Clara', 'Santo Domingo'
        ],
    
    'Sancti Spíritus': [
            'Cabaiguán', 'Fomento', 'Jatibonico', 'La Sierpe', 
            'Sancti Spíritus', 'Taguasco', 'Trinity', 'Yaguajay'
        ],
    
    'Ciego de Ávila': [
            'Baraguá', 'Bolivia', 'Chambas', 'Ciego de Ávila', 
            'Ciro Redondo', 'Florencia', 'Majagua', 'Morón', 
            'Primero de Enero', 'Venezuela'
        ],
    
    'Camagüey': [
            'Camagüey', 'Carlos M. de Céspedes', 'Esmeralda', 'Florida', 
            'Guáimaro', 'Jimaguayú', 'Minas', 'Najasa', 'Nuevitas', 
            'Sibanicú', 'Sierra de Cubitas', 'Vertientes'
        ],
    
    'Las Tunas': [
            'Amancio', 'Colombia', 'Jesús Menéndez', 'Jobabo', 
            'Las Tunas', 'Majibacoa', 'Manatí', 'Puerto Padre'
        ],
    
    'Holguín': [
            'Antilla', 'Báguanos', 'Banes', 'Cacocum', 'Calixto García', 
            'Cueto', 'Frank País', 'Gibara', 'Holguín', 'Mayarí', 
            'Moa', 'Rafael Freyre', 'Sagua de Tánamo', 'Urbano Noris'
        ],
    
    'Granma': [
            'Bartolomé Masó', 'Bayamo', 'Buey Arriba', 'Campechuela', 
            'Cauto Cristo', 'Guisa', 'Jiguaní', 'Manzanillo', 
            'Media Luna', 'Niquero', 'Pilón', 'Río Cauto', 'Yara'
        ],
    
    'Santiago de Cuba': [
            'Contramaestre', 'Guamá', 'Mella', 'Palma Soriano', 
            'San Luis', 'Santiago de Cuba', 'Segundo Frente', 
            'Songo-La Maya', 'Tercer Frente'
        ],
    
    'Guantánamo': [
            'Baracoa', 'Caimanera', 'El Salvador', 'Guantánamo', 
            'Imías', 'Maisí', 'Manuel Tames', 'Niceto Pérez', 
            'San Antonio del Sur', 'Yateras'
        ]
            
}


class AreaLocales(models.Model):
    nombre = models.CharField(max_length=50, unique=True)
    nombre_corto = models.CharField(max_length=20, unique=True)
    plan_default = models.DecimalField(max_digits=10, decimal_places=2)
    factor_pico = models.DecimalField(max_digits=5, decimal_places=2)
    factor_react = models.DecimalField(max_digits=5, decimal_places=2)
    provincia = models.CharField(max_length=50, choices=PROVINCIAS, blank=True, null=True)
    municipio = models.CharField(max_length=50, blank=True, null=True)
    activo = models.BooleanField(default=True)
    es_estatica = models.BooleanField(default=False)  # Nuevo campo

    def __str__(self):
        return self.nombre
    
    def save(self, *args, **kwargs):
        if not self.nombre_corto:
            self.nombre_corto = self.nombre.lower().replace(' ', '_').capitalize()

            if len(self.nombre_corto) >20:
                self.nombre_corto = self.nombre_corto[:20]
        super().save(*args, **kwargs)

class TablaBitacoraData(models.Model):
    area = models.ForeignKey(AreaLocales, on_delete=models.CASCADE)
    month = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(12)])
    year = models.PositiveIntegerField()
    day = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(31)])
    
    # Datos básicos
    mad = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    dia = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    pico = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    react = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    
    # Datos calculados (columnas F a AA)
    total_diario = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)  # F
    consumo_con_pico = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)  # G
    consumo_con_react = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)  # H
    diferencia_mad = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)  # J
    diferencia_dia = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)  # K
    diferencia_pico = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)  # L
    diferencia_react = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)  # M
    plan_diario = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)  # N
    pico_diario = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)  # O
    diferencia_plan_pico = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)  # P
    diferencia_consumo = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)  # Q
    plan_acumulado = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)  # R
    consumo_acumulado = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)  # S
    diferencia_acumulada = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)  # T
    plan_acumulado_total = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)  # U
    pico_acumulado_total = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)  # V
    diferencia_total = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)  # W
    plan_mensual = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)  # X
    consumo_mensual = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)  # Y
    diferencia_mensual = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)  # Z
    factor_potencia = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)  # AA
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ('area', 'month', 'year', 'day')
        verbose_name = 'Dato de Bitácora'
        verbose_name_plural = 'Datos de Bitácora'
    
    def __str__(self):
        return f"{self.area.nombre} - {self.day}/{self.month}/{self.year}"


class TablaBitacoraDataSelete(models.Model):
    """Tabla para almacenar los datos de cierre del mes anterior"""
    area = models.ForeignKey(AreaLocales, on_delete=models.CASCADE)
    month = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(12)])
    year = models.PositiveIntegerField()
    
    # Datos de cierre
    mad_cierre = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    dia_cierre = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    pico_cierre = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    total_cierre = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    pico_diurno_11am_cierre = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    pico_diurno_1pm_cierre = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    react_cierre = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ('area', 'month', 'year')
        verbose_name = 'Dato de Cierre Mensual'
        verbose_name_plural = 'Datos de Cierre Mensual'
    
    def __str__(self):
        return f"Cierre {self.month}/{self.year} - {self.area.nombre}"


class EnergyConsumption(models.Model):
    area = models.ForeignKey(AreaLocales, on_delete=models.CASCADE)
    month = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(12)])
    year = models.PositiveIntegerField()
    plan_mes = models.DecimalField(max_digits=10, decimal_places=2)
    perdidas = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    # updated_at = models.DateTimeField(auto_now=True)  # Nuevo campo para tracking

    class Meta:
        unique_together = ('area', 'month', 'year')

    # def save(self, *args, **kwargs):
    #     # Si es un nuevo registro y no se especificó plan_mes, usar el valor por defecto del área
    #     if not self.pk and not self.plan_mes:
    #         self.plan_mes = self.area.plan_default
    #     super().save(*args, **kwargs)

class DailyConsumption(models.Model):
    energy_consumption = models.ForeignKey(EnergyConsumption, on_delete=models.CASCADE, related_name='daily_data')
    day = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(31)])
    mad = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    dia = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    pico = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    react = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

    # Campos para el cierre del mes anterior #Cod_2
    mad_cierre = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    dia_cierre = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    pico_cierre = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    total_cierre = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    pico_diurno_11am_cierre = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    pico_diurno_1pm_cierre = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    react_cierre = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

    class Meta:
        unique_together = ('energy_consumption', 'day')
        ordering = ['-day']

class TransformerLossData(models.Model):
    # AREA_CHOICES = [
    #     ('Cocina C', 'Cocina Comedor'),
    #     ('Ciencia A', 'Ciencia Animal'),
    #     ('Preparatoria', 'Preparatoria'),
    #     ('Sede Martí', 'José Martí'),
    #     ('A.Cultural', 'Área Cultural'),
    #     ('Laboratorios Tec.', 'Laboratorios Técnicos'),
    #     ('Sede Fajardo', 'Manuel Fajardo'),
    # ]
    
    
    # area = models.ForeignKey(AreaLocales, on_delete=models.CASCADE)
    area = models.CharField(max_length=50)
    month = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(12)])
    year = models.PositiveIntegerField()
    reactive_consumption = models.DecimalField(max_digits=10, decimal_places=2)  # Consumo Reactivo (M42)
    monthly_consumption = models.DecimalField(max_digits=10, decimal_places=2)   # Consumo Mes (Y11/Y12/Y13/Y14)
    kva = models.DecimalField(max_digits=10, decimal_places=2, default=5)
    pfe = models.DecimalField(max_digits=10, decimal_places=3, default=0.046)
    pcu = models.DecimalField(max_digits=10, decimal_places=3, default=0.107)
    

    class Meta:
        unique_together = ('area', 'month', 'year')
        verbose_name = 'Transformer Loss Data'
        verbose_name_plural = 'Transformer Loss Data'


# class DailyReport(models.Model):
#     # date = models.DateField(unique=True)
#     # created_at = models.DateTimeField(auto_now_add=True)
#     # areas = models.ManyToManyField(AreaLocales, through='DailyReportArea')
    
#     date = models.DateField(unique=True)
#     created_at = models.DateTimeField(auto_now_add=True)
    
#     class Meta:
#         verbose_name = 'Reporte Diario'
#         verbose_name_plural = 'Reportes Diarios'
#         ordering = ['-date']
    
#     def __str__(self):
#         return f"Reporte Diario - {self.date}"


# class DailyReportArea(models.Model):
#     # daily_report = models.ForeignKey(DailyReport, on_delete=models.CASCADE)
#     # area = models.ForeignKey(AreaLocales, on_delete=models.CASCADE)
#     # data = models.JSONField()  # Almacena los datos específicos del área para esta fecha


#     daily_report = models.ForeignKey(DailyReport, on_delete=models.CASCADE)
#     area = models.ForeignKey(AreaLocales, on_delete=models.CASCADE)
#     data = models.JSONField(default=dict)
#     created_at = models.DateTimeField(auto_now_add=True)
    
#     class Meta:
#         unique_together = ('daily_report', 'area')
#         verbose_name = 'Área de Reporte Diario'
#         verbose_name_plural = 'Áreas de Reporte Diario'
    
#     def __str__(self):
#         return f"{self.area.nombre} - {self.daily_report.date}"



class DailyReport(models.Model):
    report_date = models.DateField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    areas = models.ManyToManyField(AreaLocales, through='DailyReportAreaData')
    
class DailyReportAreaData(models.Model):
    daily_report = models.ForeignKey(DailyReport, on_delete=models.CASCADE)
    area = models.ForeignKey(AreaLocales, on_delete=models.CASCADE)
    plan_total_mes = models.DecimalField(max_digits=10, decimal_places=2)
    plan_acumulado = models.DecimalField(max_digits=10, decimal_places=2)
    real_acumulado = models.DecimalField(max_digits=10, decimal_places=2)
    plan_dia = models.DecimalField(max_digits=10, decimal_places=2)
    real_dia = models.DecimalField(max_digits=10, decimal_places=2)
    perdidas = models.DecimalField(max_digits=10, decimal_places=2)
    diarias = models.DecimalField(max_digits=10, decimal_places=2)
    
class PeakReadingData(models.Model):
    daily_report = models.ForeignKey(DailyReport, on_delete=models.CASCADE)
    area = models.ForeignKey(AreaLocales, on_delete=models.CASCADE)
    lectura_11_am = models.DecimalField(max_digits=10, decimal_places=2)
    lectura_1_pm = models.DecimalField(max_digits=10, decimal_places=2)
    lectura_5_pm = models.DecimalField(max_digits=10, decimal_places=2)
    lectura_9_pm = models.DecimalField(max_digits=10, decimal_places=2)
    lectura_inicial = models.DecimalField(max_digits=10, decimal_places=2)
    lectura_final = models.DecimalField(max_digits=10, decimal_places=2)


# class Provincia(models.Model):
#     nombre = models.CharField(max_length=50, unique=True)
#     capital = models.CharField(max_length=50)
#     activo = models.BooleanField(default=True)
    
#     class Meta:
#         verbose_name = 'Provincia'
#         verbose_name_plural = 'Provincias'
#         ordering = ['nombre']
    
#     def __str__(self):
#         return self.nombre

# class Municipio(models.Model):
#     provincia = models.ForeignKey(Provincia, on_delete=models.CASCADE, related_name='municipios')
#     nombre = models.CharField(max_length=50)
#     activo = models.BooleanField(default=True)
    
#     class Meta:
#         verbose_name = 'Municipio'
#         verbose_name_plural = 'Municipios'
#         ordering = ['provincia', 'nombre']
#         unique_together = ['provincia', 'nombre']
    
#     def __str__(self):
#         return f"{self.nombre} ({self.provincia.nombre})"

# class DiaryStatic(models.Model):
#     area = models.ForeignKey(AreaLocales, on_delete=models.CASCADE)
#     provincia = models.ForeignKey(Provincia, on_delete=models.CASCADE, default=10)  # Default: Camagüey
#     municipio = models.ForeignKey(Municipio, on_delete=models.CASCADE, default=1)  # Default: Camagüey
#     plan_mes = models.DecimalField(max_digits=10, decimal_places=2, default=0)
#     en_uso = models.BooleanField(default=True)
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)

#     class Meta:
#         unique_together = ('area',)
#         verbose_name = 'Área Estática'
#         verbose_name_plural = 'Áreas Estáticas'

#     def __str__(self):
#         return f"{self.area.nombre} - {self.municipio.nombre}, {self.provincia.nombre}"


# class AreaConfiguration(models.Model):
#     area = models.ForeignKey(AreaLocales, on_delete=models.CASCADE)
#     provincia = models.ForeignKey(Provincia, on_delete=models.CASCADE, default=10)  # Default: Camagüey
#     municipio = models.ForeignKey(Municipio, on_delete=models.CASCADE, default=1)  # Default: Camagüey
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)

#     class Meta:
#         unique_together = ('area',)
#         verbose_name = 'Configuración de Área'
#         verbose_name_plural = 'Configuraciones de Área'

#     def __str__(self):
#         return f"{self.area.nombre} - {self.municipio.nombre}, {self.provincia.nombre}"

# PROVINCIAS = [
#     ('Pinar del Río', 'Pinar del Río'),
#     ('Artemisa', 'Artemisa'),
#     ('La Habana', 'La Habana'),
#     ('Mayabeque', 'Mayabeque'),
#     ('Matanzas', 'Matanzas'),
#     ('Cienfuegos', 'Cienfuegos'),
#     ('Villa Clara', 'Villa Clara'),
#     ('Sancti Spíritus', 'Sancti Spíritus'),
#     ('Ciego de Ávila', 'Ciego de Ávila'),
#     ('Camagüey', 'Camagüey'),
#     ('Las Tunas', 'Las Tunas'),
#     ('Holguín', 'Holguín'),
#     ('Granma', 'Granma'),
#     ('Santiago de Cuba', 'Santiago de Cuba'),
#     ('Guantánamo', 'Guantánamo'),
# ]

# MUNICIPIOS = {
#     'Pinar del Río': [
#             'Consolación del Sur', 'Guane', 'La Palma', 'Los Palacios', 
#             'Mantua', 'Minas de Matahambre', 'Pinar del Río', 
#             'San Juan y Martínez', 'San Luis', 'Sandino', 'Viñales'
#         ],
    
#     'Artemisa': [
#             'Alquízar', 'Artemisa', 'Bauta', 'Caimito', 'Guanajay', 
#             'Güira de Melena', 'Mariel', 'San Antonio de los Baños', 
#             'Bahía Honda', 'Candelaria', 'San Cristóbal'
#         ],
    
#     'La Habana': [
#             'Arroyo Naranjo', 'Boyeros', 'Centro Habana', 'Cerro', 'Cotorro', 
#             'Diez de Octubre', 'Guanabacoa', 'La Habana del Este', 
#             'La Habana Vieja', 'La Lisa', 'Marianao', 'Playa', 
#             'Plaza de la Revolución', 'Regla', 'San Miguel del Padrón'
#         ],
    
#     'Mayabeque': [
#             'Batabanó', 'Bejucal', 'Güines', 'Jaruco', 'Madruga', 
#             'Melena del Sur', 'Nueva Paz', 'Quivicán', 
#             'San José de las Lajas', 'Santa Cruz del Norte'
#         ],
    
#     'Matanzas': [
#             'Calimete', 'Cárdenas', 'Ciénaga de Zapata', 'Colón', 
#             'Jagüey Grande', 'Jovellanos', 'Limonar', 'Los Arabos', 
#             'Martí', 'Matanzas', 'Pedro Betancourt', 'Perico', 'Unión de Reyes'
#         ],
    
#     'Cienfuegos': [
#             'Abreus', 'Aguada de Pasajeros', 'Cienfuegos', 'Cruces', 
#             'Cumanayagua', 'Lajas', 'Palmira', 'Rodas'
#         ],
    
#     'Villa Clara': [
#             'Caibarién', 'Camajuaní', 'Cifuentes', 'Corralillo', 
#             'Encrucijada', 'Manicaragua', 'Placetas', 'Quemado de Güines', 
#             'Ranchuelo', 'Remedios', 'Sagua la Grande', 'Santa Clara', 'Santo Domingo'
#         ],
    
#     'Sancti Spíritus': [
#             'Cabaiguán', 'Fomento', 'Jatibonico', 'La Sierpe', 
#             'Sancti Spíritus', 'Taguasco', 'Trinity', 'Yaguajay'
#         ],
    
#     'Ciego de Ávila': [
#             'Baraguá', 'Bolivia', 'Chambas', 'Ciego de Ávila', 
#             'Ciro Redondo', 'Florencia', 'Majagua', 'Morón', 
#             'Primero de Enero', 'Venezuela'
#         ],
    
#     'Camagüey': [
#             'Camagüey', 'Carlos M. de Céspedes', 'Esmeralda', 'Florida', 
#             'Guáimaro', 'Jimaguayú', 'Minas', 'Najasa', 'Nuevitas', 
#             'Sibanicú', 'Sierra de Cubitas', 'Vertientes'
#         ],
    
#     'Las Tunas': [
#             'Amancio', 'Colombia', 'Jesús Menéndez', 'Jobabo', 
#             'Las Tunas', 'Majibacoa', 'Manatí', 'Puerto Padre'
#         ],
    
#     'Holguín': [
#             'Antilla', 'Báguanos', 'Banes', 'Cacocum', 'Calixto García', 
#             'Cueto', 'Frank País', 'Gibara', 'Holguín', 'Mayarí', 
#             'Moa', 'Rafael Freyre', 'Sagua de Tánamo', 'Urbano Noris'
#         ],
    
#     'Granma': [
#             'Bartolomé Masó', 'Bayamo', 'Buey Arriba', 'Campechuela', 
#             'Cauto Cristo', 'Guisa', 'Jiguaní', 'Manzanillo', 
#             'Media Luna', 'Niquero', 'Pilón', 'Río Cauto', 'Yara'
#         ],
    
#     'Santiago de Cuba': [
#             'Contramaestre', 'Guamá', 'Mella', 'Palma Soriano', 
#             'San Luis', 'Santiago de Cuba', 'Segundo Frente', 
#             'Songo-La Maya', 'Tercer Frente'
#         ],
    
#     'Guantánamo': [
#             'Baracoa', 'Caimanera', 'El Salvador', 'Guantánamo', 
#             'Imías', 'Maisí', 'Manuel Tames', 'Niceto Pérez', 
#             'San Antonio del Sur', 'Yateras'
#         ]
            
# }

class AreaEstatica(models.Model):
    nombre = models.CharField(max_length=100, unique=True)
    provincia = models.CharField(max_length=50, choices=PROVINCIAS, blank=True, null=True)
    municipio = models.CharField(max_length=50, blank=True, null=True)
    plan_mes = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    activa = models.BooleanField(default=True)
    
    # class Meta:
    #     verbose_name = 'Área Estática'
    #     verbose_name_plural = 'Áreas Estáticas'
    #     ordering = ['orden', 'nombre']
    
    # def __str__(self):
    #     return self.nombre

    # area_local = models.OneToOneField(
    #     'AreaLocales', 
    #     on_delete=models.SET_NULL, 
    #     null=True, 
    #     blank=True,
    #     related_name='area_estatica'
    # )

    class Meta:
        verbose_name = 'Área Estática'
        verbose_name_plural = 'Áreas Estáticas'
        ordering = ['nombre']
    
    def __str__(self):
        return self.nombre
    
    def save(self, *args, **kwargs):
        # Eliminar el campo orden ya que no se usará más
        if hasattr(self, 'orden'):
            delattr(self, 'orden')
        super().save(*args, **kwargs)