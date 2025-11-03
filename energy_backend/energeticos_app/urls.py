from django.urls import path
from . import views
from rest_framework import routers

urlpatterns = [
    # Energetico  
    path('energy-consumption/', views.EnergyConsumptionAPIView.as_view(), name='energy-consumption'),
    path('download-excel-bitacora/', views.DownloadExcelAPIView.as_view(), name='download-excel'),
    # path('save-area-data/', views.SaveAreaDataAPIView.as_view(), name='save-area-data'),
    # path('download-excel-b/', views.DownloadExcelBAPIView.as_view(), name='download-excel-b'),
    path('get-energy-data/', views.GetEnergyDataAPIView.as_view(), name='get-energy-datal'),

    path('areas/', views.AreaLocalesAPIView.as_view(), name='area-list'),
    path('areas/<int:pk>/', views.AreaLocalesAPIView.as_view(), name='area-detail'),

    path('transformer-loss-data/', views.TransformerLossDataAPIView.as_view(), name='transformer-loss-data'),
    path('process-bitacora-file/', views.ProcessBitacoraFileAPIView.as_view(), name='get-energy-data'),
    path('download-excel-transformer-loss-data/', views.DownloadExcelTransformerLossAPIView.as_view(), name='download-excel-transformer-loss-data'),

    # Añadir al urls.py existente
    # path('daily-report/', views.DailyReportAPIView.as_view(), name='daily-report'),
    # path('available-dates/', views.AvailableDatesAPIView.as_view(), name='available-dates'),

    path('generate-daily-report/', views.GenerateDailyReportAPIView.as_view(), name='generate-daily-report'),

    # path('provinces/', views.ProvinciaAPIView.as_view(), name='province-list'),
    # path('municipalities/', views.MunicipioAPIView.as_view(), name='municipality-list'),
    # path('area-configurations/', views.AreaConfigurationAPIView.as_view(), name='area-configuration-list'),
    # path('area-configurations/<int:pk>/', views.AreaConfigurationAPIView.as_view(), name='area-configuration-detail'),
    # path('diary-static/', views.DiaryStaticAPIView.as_view(), name='diary-static-list'),
    # path('diary-static/<int:pk>/', views.DiaryStaticAPIView.as_view(), name='diary-static-detail'),

    path('areas-estaticas/', views.AreaEstaticaAPIView.as_view(), name='areas-estaticas'),
    path('areas-estaticas/<int:pk>/', views.AreaEstaticaAPIView.as_view(), name='area-estatica-detail'),
]
