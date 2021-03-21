from django.db import models
import os
# from conditions_tracker_app.avatar_helpers import *

class ConditionsModel(models.Model):
    id = models.AutoField(primary_key=True, unique=True)
    condition_name = models.CharField(max_length=100)
    severity = models.IntegerField()
    start_date = models.DateField(null=True,)
    end_date = models.DateField(null=True)

class PatientModel(models.Model):
    id = models.IntegerField(primary_key=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    age = models.IntegerField()
    contact_info = models.CharField(max_length=100)
    gender = models.CharField(max_length=10)
    avatar = models.ImageField(upload_to='images/avatars/')
    conditions = models.ForeignKey(ConditionsModel, on_delete=models.CASCADE)
