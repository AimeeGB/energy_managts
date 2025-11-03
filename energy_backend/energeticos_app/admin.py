from django.contrib import admin
from . import models

admin.site.register(models.AreaLocales)

admin.site.register(models.EnergyConsumption)

admin.site.register(models.DailyConsumption)
