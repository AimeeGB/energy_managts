Título: Sistema para la gestión de la energía en una Empresa.

Los hoteles de la ciudad de Camagüey y la Universidad de Camagüey no cuentan con un sistema para la gestión de la energía, siendo imprescindible para su control y ejecución. Se pretende crear el sistema de gestión de la energía de esas instituciones donde se pueda analizar en tiempo real todas las variables que intervienen en el uso de la energía y así usarlas eficientemente. Este sistema se basa en la aplicación de la norma NC-ISO 50001:2019

1. Descripción General del Proyecto
Se está desarrollando una aplicación web para la gestión de la energía en una empresa, construida sobre una arquitectura que utiliza Django y Python para el backend, y React JS, JavaScript y Tailwind CSS para el frontend. 

2. Módulos y Funcionalidades Principales
Módulo 1: Administración
Este módulo se divide en tres secciones:
-	Acuerdos: Permite gestionar una tabla de acuerdos, con funcionalidades para crear, eliminar y visualizar su nombre, estado y fecha límite.
-	Inspecciones: Facilita la creación de inspecciones (tipos, inspector, fecha, descripción). Cada inspección se visualiza en una tarjeta con opciones para ver detalles completos, editar, eliminar y exportar en formato PDF.
- Perfil de Usuario: Muestra la información del usuario logueado y permite su edición.

Módulo 2: Área de Gráficos
-	Visualización: Muestra todos los gráficos existentes.
-	Filtros Independientes: Cada gráfico puede personalizarse con tres filtros que actúan de forma independiente:
1.	Selector de intervalos de tiempo predefinidos.
2.	Checkbox para mostrar datos de las últimas 24 horas.
3.	Selector de calendario para elegir un día específico.
-	Carga de Archivos: Incluye una funcionalidad para cargar archivos desde el equipo local y generar nuevos gráficos a partir de ellos.

Módulo 3: Reportes Energéticos
Este módulo contiene tres paneles:
-	Panel Principal:
o	Tabla dinámica referente a los meses del año y las áreas existentes (las cuales pueden crearse, eliminarse o desactivarse mediante un formulario).
o	Ingesta de datos de cierre de mes, plan y pérdidas.
o	Funcionalidades de guardado de cambios con alertas preventivas y exportación de datos a Excel.
-	Pérdidas:
o	Muestra una tabla con datos específicos (kVA, Pfe, Pcu) para un mes seleccionado.
o	Permite modificar valores mediante un selector, donde el cambio de un dato actualiza automáticamente los demás.
o	Incluye botón para exportar a Excel.
-	Reportes Diarios:
o	Genera un reporte específico para un día elegido, siempre que existan los datos necesarios.
o	Utiliza una tabla de áreas estáticas predefinidas por el usuario para la elaboración del reporte.







