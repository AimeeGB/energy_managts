from django.urls import path
from . import views
from rest_framework import routers

urlpatterns = [

    # Cliente 
    path('clientes/', views.ClienteList.as_view()),
    path('clientes/<int:pk>/', views.ClienteList.as_view()),
    path('cliente/<int:pk>/', views.ClienteDetail.as_view()),
    path('client-profile/', views.ClienteProfileView.as_view()),

    path('clients/', views.ClienteDetail.as_view()),

    # Agreements 
    path('acuerdos/', views.AgreementsList.as_view()),
    path('acuerdos/<int:pk>/', views.AgreementsList.as_view()),
    path('acuerdo/<int:pk>/', views.AgreementsDetail.as_view()),
    
    path('acuerd/', views.AgreementsDetail.as_view()),

    # Inspecciones 
    path('inspecciones/', views.InspeccionesList.as_view()),
    path('inspecciones/<int:pk>/', views.InspeccionesList.as_view()),
    path('inspeccion/<int:pk>/', views.InspeccionesDetail.as_view()),
    
    path('inspeccions/', views.InspeccionesDetail.as_view()),

    # path('inspecciones/<int:pk>/export-pdf/', views.ExportInspeccionPDFView.as_view(), name='export_inspeccion_pdf'),

    # Authentication
    path('admin/register/', views.RegisterView.as_view()),
    path('admin/login/', views.LoginView.as_view()),

]

# urlpatterns 