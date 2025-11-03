from django.core.management.base import BaseCommand
from energeticos_app.models import Provincia, Municipio

class Command(BaseCommand):
    help = 'Populate Cuban provinces and municipalities'

    def handle(self, *args, **options):
        # Datos de provincias y municipios de Cuba
        provinces_data = [
            {
                'nombre': 'Pinar del Río',
                'capital': 'Pinar del Río',
                'municipios': [
                    'Consolación del Sur', 'Guane', 'La Palma', 'Los Palacios', 
                    'Mantua', 'Minas de Matahambre', 'Pinar del Río', 
                    'San Juan y Martínez', 'San Luis', 'Sandino', 'Viñales'
                ]
            },
            {
                'nombre': 'Artemisa',
                'capital': 'Artemisa',
                'municipios': [
                    'Alquízar', 'Artemisa', 'Bauta', 'Caimito', 'Guanajay', 
                    'Güira de Melena', 'Mariel', 'San Antonio de los Baños', 
                    'Bahía Honda', 'Candelaria', 'San Cristóbal'
                ]
            },
            {
                'nombre': 'La Habana',
                'capital': 'La Habana',
                'municipios': [
                    'Arroyo Naranjo', 'Boyeros', 'Centro Habana', 'Cerro', 'Cotorro', 
                    'Diez de Octubre', 'Guanabacoa', 'La Habana del Este', 
                    'La Habana Vieja', 'La Lisa', 'Marianao', 'Playa', 
                    'Plaza de la Revolución', 'Regla', 'San Miguel del Padrón'
                ]
            },
            {
                'nombre': 'Mayabeque',
                'capital': 'San José de las Lajas',
                'municipios': [
                    'Batabanó', 'Bejucal', 'Güines', 'Jaruco', 'Madruga', 
                    'Melena del Sur', 'Nueva Paz', 'Quivicán', 
                    'San José de las Lajas', 'Santa Cruz del Norte'
                ]
            },
            {
                'nombre': 'Matanzas',
                'capital': 'Matanzas',
                'municipios': [
                    'Calimete', 'Cárdenas', 'Ciénaga de Zapata', 'Colón', 
                    'Jagüey Grande', 'Jovellanos', 'Limonar', 'Los Arabos', 
                    'Martí', 'Matanzas', 'Pedro Betancourt', 'Perico', 'Unión de Reyes'
                ]
            },
            {
                'nombre': 'Cienfuegos',
                'capital': 'Cienfuegos',
                'municipios': [
                    'Abreus', 'Aguada de Pasajeros', 'Cienfuegos', 'Cruces', 
                    'Cumanayagua', 'Lajas', 'Palmira', 'Rodas'
                ]
            },
            {
                'nombre': 'Villa Clara',
                'capital': 'Santa Clara',
                'municipios': [
                    'Caibarién', 'Camajuaní', 'Cifuentes', 'Corralillo', 
                    'Encrucijada', 'Manicaragua', 'Placetas', 'Quemado de Güines', 
                    'Ranchuelo', 'Remedios', 'Sagua la Grande', 'Santa Clara', 'Santo Domingo'
                ]
            },
            {
                'nombre': 'Sancti Spíritus',
                'capital': 'Sancti Spíritus',
                'municipios': [
                    'Cabaiguán', 'Fomento', 'Jatibonico', 'La Sierpe', 
                    'Sancti Spíritus', 'Taguasco', 'Trinity', 'Yaguajay'
                ]
            },
            {
                'nombre': 'Ciego de Ávila',
                'capital': 'Ciego de Ávila',
                'municipios': [
                    'Baraguá', 'Bolivia', 'Chambas', 'Ciego de Ávila', 
                    'Ciro Redondo', 'Florencia', 'Majagua', 'Morón', 
                    'Primero de Enero', 'Venezuela'
                ]
            },
            {
                'nombre': 'Camagüey',
                'capital': 'Camagüey',
                'municipios': [
                    'Camagüey', 'Carlos M. de Céspedes', 'Esmeralda', 'Florida', 
                    'Guáimaro', 'Jimaguayú', 'Minas', 'Najasa', 'Nuevitas', 
                    'Sibanicú', 'Sierra de Cubitas', 'Vertientes'
                ]
            },
            {
                'nombre': 'Las Tunas',
                'capital': 'Las Tunas',
                'municipios': [
                    'Amancio', 'Colombia', 'Jesús Menéndez', 'Jobabo', 
                    'Las Tunas', 'Majibacoa', 'Manatí', 'Puerto Padre'
                ]
            },
            {
                'nombre': 'Holguín',
                'capital': 'Holguín',
                'municipios': [
                    'Antilla', 'Báguanos', 'Banes', 'Cacocum', 'Calixto García', 
                    'Cueto', 'Frank País', 'Gibara', 'Holguín', 'Mayarí', 
                    'Moa', 'Rafael Freyre', 'Sagua de Tánamo', 'Urbano Noris'
                ]
            },
            {
                'nombre': 'Granma',
                'capital': 'Bayamo',
                'municipios': [
                    'Bartolomé Masó', 'Bayamo', 'Buey Arriba', 'Campechuela', 
                    'Cauto Cristo', 'Guisa', 'Jiguaní', 'Manzanillo', 
                    'Media Luna', 'Niquero', 'Pilón', 'Río Cauto', 'Yara'
                ]
            },
            {
                'nombre': 'Santiago de Cuba',
                'capital': 'Santiago de Cuba',
                'municipios': [
                    'Contramaestre', 'Guamá', 'Mella', 'Palma Soriano', 
                    'San Luis', 'Santiago de Cuba', 'Segundo Frente', 
                    'Songo-La Maya', 'Tercer Frente'
                ]
            },
            {
                'nombre': 'Guantánamo',
                'capital': 'Guantánamo',
                'municipios': [
                    'Baracoa', 'Caimanera', 'El Salvador', 'Guantánamo', 
                    'Imías', 'Maisí', 'Manuel Tames', 'Niceto Pérez', 
                    'San Antonio del Sur', 'Yateras'
                ]
            }
        ]

        # Crear provincias y municipios
        for province_data in provinces_data:
            province, created = Provincia.objects.get_or_create(
                nombre=province_data['nombre'],
                defaults={'capital': province_data['capital']}
            )
            
            if created:
                self.stdout.write(
                    self.style.SUCCESS(f'Created province: {province.nombre}')
                )
            
            for municipio_name in province_data['municipios']:
                municipio, created = Municipio.objects.get_or_create(
                    provincia=province,
                    nombre=municipio_name
                )
                
                if created:
                    self.stdout.write(
                        self.style.SUCCESS(f'  Created municipality: {municipio.nombre}')
                    )

        self.stdout.write(
            self.style.SUCCESS('Successfully populated provinces and municipalities')
        )

