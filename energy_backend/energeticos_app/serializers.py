from decimal import Decimal, InvalidOperation
from rest_framework import serializers
from . import models

class AreaLocalesSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.AreaLocales
        fields = '__all__'
        extra_kwargs = {
            'nombre_corto': {'required': False, 'allow_blank': True}
        #     'plan_default': {'required': True},
        #     'factor_pico': {'required': True},
        #     'factor_react': {'required': True}
        }

class TablaBitacoraDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.TablaBitacoraData
        fields = '__all__'
        

class DailyConsumptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.DailyConsumption
        fields = '__all__'
        read_only_fields = ('id', 'energy_consumption')
        
    def validate(self, data):
        # Cuando se crea/actualiza un DailyConsumption, verificar si hay datos de cierre
        if 'day' in data and data['day'] == 1:
            area = self.context.get('area')
            month = self.context.get('month')
            year = self.context.get('year')
            
            if area and month and year:
                prev_month = month - 1 if month > 1 else 12
                prev_year = year if month > 1 else year - 1
                
                try:
                    cierre_data = models.TablaBitacoraDataSelete.objects.get(
                        area=area,
                        month=prev_month,
                        year=prev_year
                    )
                    # Si no hay datos de cierre en el registro actual, usar los de la tabla de cierre
                    if 'mad_cierre' not in data or not data['mad_cierre']:
                        data['mad_cierre'] = cierre_data.mad_cierre
                    if 'dia_cierre' not in data or not data['dia_cierre']:
                        data['dia_cierre'] = cierre_data.dia_cierre
                    if 'pico_cierre' not in data or not data['pico_cierre']:
                        data['pico_cierre'] = cierre_data.pico_cierre
                    if 'react_cierre' not in data or not data['react_cierre']:
                        data['react_cierre'] = cierre_data.react_cierre
                except models.TablaBitacoraDataSelete.DoesNotExist:
                    pass
                    
        return data
   
#Codigo de prueba 21/05/25

class EnergyConsumptionSerializer(serializers.ModelSerializer):
    daily_data = DailyConsumptionSerializer(many=True, required=False)
    area = AreaLocalesSerializer(read_only=True)
    area_id = serializers.PrimaryKeyRelatedField(
        queryset=models.AreaLocales.objects.filter(activo=True),
        source='area',
        write_only=True,
        required=True  # Asegúrate de que sea requerido
    )

    class Meta:
        model = models.EnergyConsumption
        fields = '__all__'

    def validate(self, data):
        # Validación adicional si es necesaria
        if 'month' not in data or 'year' not in data or 'area' not in data:
            raise serializers.ValidationError("Month, year and area are required")
        return data

    def create_or_update(self, validated_data):
        daily_data = validated_data.pop('daily_data', [])
        area = validated_data.get('area')
        month = validated_data.get('month')
        year = validated_data.get('year')

        try:
            instance, created = models.EnergyConsumption.objects.update_or_create(
                area=area,
                month=month,
                year=year,
                defaults=validated_data
            )
            
            self.update_daily_data(instance, daily_data)
            return instance
        except Exception as e:
            raise serializers.ValidationError(str(e))
        
    def update_daily_data(self, instance, new_daily_data):
        existing_daily = {d.day: d for d in instance.daily_data.all()}
        
        for daily_item in new_daily_data:
            day = daily_item['day']
            if day in existing_daily:
                # Actualizar registro existente solo si hay cambios
                existing_record = existing_daily[day]
                needs_update = False
                for field in ['mad', 'dia', 'pico', 'react', 'mad_cierre', 'dia_cierre', 
                             'pico_cierre', 'total_cierre', 'pico_diurno_11am_cierre', 
                             'pico_diurno_1pm_cierre', 'react_cierre']:
                    if field in daily_item and getattr(existing_record, field) != daily_item[field]:
                        setattr(existing_record, field, daily_item[field])
                        needs_update = True
                if needs_update:
                    existing_record.save()
            else:
                # Crear nuevo registro si no existe
                models.DailyConsumption.objects.create(energy_consumption=instance, **daily_item)


# class EnergyConsumptionSerializer(serializers.ModelSerializer):
#     daily_data = DailyConsumptionSerializer(many=True, required=False)
#     area = AreaLocalesSerializer(read_only=True)
#     area_id = serializers.PrimaryKeyRelatedField(
#         queryset=models.AreaLocales.objects.filter(activo=True),
#         source='area',
#         write_only=True,
#         required=True
#     )
#     update_area_default = serializers.BooleanField(
#         write_only=True,
#         required=False,
#         default=False,
#         help_text="Si es True, actualiza también el plan_default en AreaLocales"
#     )

#     class Meta:
#         model = models.EnergyConsumption
#         fields = '__all__'
#         extra_fields = ['update_area_default']

#     def validate(self, data):
#         if 'month' not in data or 'year' not in data or 'area' not in data:
#             raise serializers.ValidationError("Month, year and area are required")
#         return data

#     def create_or_update(self, validated_data):
#         update_area_default = validated_data.pop('update_area_default', False)
#         daily_data = validated_data.pop('daily_data', [])
#         area = validated_data.get('area')
#         month = validated_data.get('month')
#         year = validated_data.get('year')

#         try:
#             # Si estamos actualizando el plan_mes y se marcó update_area_default
#             if 'plan_mes' in validated_data and update_area_default:
#                 # Actualizar el plan_default en AreaLocales
#                 area.plan_default = validated_data['plan_mes']
#                 area.save()

#             instance, created = models.EnergyConsumption.objects.update_or_create(
#                 area=area,
#                 month=month,
#                 year=year,
#                 defaults=validated_data
#             )
            
#             self.update_daily_data(instance, daily_data)
#             return instance
#         except Exception as e:
#             raise serializers.ValidationError(str(e))

  
class TransformerLossDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.TransformerLossData
        fields = '__all__'

    def validate(self, data):
        # Para actualización PATCH, solo validar campos presentes
        if self.instance is not None:  # Es una actualización
            return data
            
        # Para creación, validar campos requeridos
        required_fields = ['area', 'month', 'year']
        if any(field not in data for field in required_fields):
            raise serializers.ValidationError(
                "Los campos area, month y year son requeridos para crear un nuevo registro"
            )
        return data
    

# Añadir al archivo serializers.py existente

# class DailyReportAreaSerializer(serializers.ModelSerializer):
#     area_name = serializers.CharField(source='area.nombre', read_only=True)
    
#     class Meta:
#         model = models.DailyReportArea
#         fields = ['id', 'area', 'area_name', 'data', 'created_at']

# class DailyReportSerializer(serializers.ModelSerializer):
#     areas_data = DailyReportAreaSerializer(many=True, read_only=True, source='dailyreportarea_set')
    
#     class Meta:
#         model = models.DailyReport
#         fields = ['id', 'date', 'created_at', 'areas_data']


class DailyReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.DailyReport
        fields = '__all__'

class DailyReportAreaDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.DailyReportAreaData
        fields = '__all__'

class PeakReadingDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.PeakReadingData
        fields = '__all__'

# class ProvinciaSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = models.Provincia
#         fields = '__all__'

# class MunicipioSerializer(serializers.ModelSerializer):
#     provincia_nombre = serializers.CharField(source='provincia.nombre', read_only=True)
    
#     class Meta:
#         model = models.Municipio
#         fields = ['id', 'nombre', 'provincia', 'provincia_nombre', 'activo']

# class AreaConfigurationSerializer(serializers.ModelSerializer):
#     provincia_nombre = serializers.CharField(source='provincia.nombre', read_only=True)
#     municipio_nombre = serializers.CharField(source='municipio.nombre', read_only=True)
    
#     class Meta:
#         model = models.AreaConfiguration
#         fields = '__all__'

# class DiaryStaticSerializer(serializers.ModelSerializer):
#     provincia_nombre = serializers.CharField(source='provincia.nombre', read_only=True)
#     municipio_nombre = serializers.CharField(source='municipio.nombre', read_only=True)
#     area_nombre = serializers.CharField(source='area.nombre', read_only=True)
    
#     class Meta:
#         model = models.DiaryStatic
#         fields = '__all__'


# class AreaEstaticaSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = models.AreaEstatica
#         fields = '__all__'

class AreaEstaticaSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.AreaEstatica
        fields = '__all__'
        extra_kwargs = {
            'orden': {'required': False}  # Eliminar la necesidad del campo orden
        }

# class AreaEstaticaSerializer(serializers.ModelSerializer):
#     # NUEVO: Incluir información del área local relacionada
#     area_local_nombre = serializers.CharField(source='area_local.nombre', read_only=True)
#     area_local_id = serializers.PrimaryKeyRelatedField(
#         queryset=models.AreaLocales.objects.filter(activo=True),
#         source='area_local',
#         required=False,
#         allow_null=True
#     )

#     class Meta:
#         model = models.AreaEstatica
#         fields = '__all__'
#         extra_fields = ['area_local_nombre', 'area_local_id']