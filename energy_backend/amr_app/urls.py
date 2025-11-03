from django.urls import path
from . import views
from rest_framework import routers

urlpatterns = [

    # Graficos  
    path('upload-xlsx/', views.UploadXLSXView.as_view(), name='upload_xlsx'),
    
    # path('data-views-instituto/', views.INST_SUPERIOR_PEDAGOGICO_DataView.as_view(), name='get_contador_instituto'),

    # path('data-views-laboratorio-tec/', views.LABORATORIO_TEC_DataView.as_view(), name='get_contador_laboratorio'),

    # path('data-views-cultura/', views.AREA_CULTURAL_DataView.as_view(), name='get_contador_cultura'),

    # path('data-views-cocina/', views.COCINA_UNIVERSIDAD_DataView.as_view(), name='get_contador_cocina'),

    # path('data-views-ciencia-animal/', views.FAC_CIENCIA_ANIMAL_DataView.as_view(), name='get_contador_ciencia-animal'),

    # path('data-views-preparatoria/', views.FAC_PREPARATORIA_DataView.as_view(), name='get_contador_preparatoria'),

    path('contadores/', views.AMRContadorListView.as_view(), name='list_contadores'),
    path('data-views/', views.AMRGenericDataView.as_view(), name='get_contador_data'),

]

# urlpatterns 