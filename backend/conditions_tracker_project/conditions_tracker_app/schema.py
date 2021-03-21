import graphene 
from graphene_django.types import DjangoObjectType
from graphene import ObjectType, Field, Schema
from graphene.types.generic import GenericScalar
  
from django.db import models
from django.core import serializers

from conditions_tracker_app.models import ConditionsModel, PatientModel

class Upload(graphene.Scalar):
    def serialize(self):
        pass

class ConditionsInput(graphene.InputObjectType):
    condition_name = graphene.String(required=True)
    severity = graphene.Int()
    start_date = graphene.Date()
    end_date = graphene.Date()

class PatientInput(graphene.InputObjectType):
    first_name = graphene.String()
    last_name = graphene.String()
    age = graphene.Int()
    contact_info = graphene.String()
    gender = graphene.String()
    avatar = Upload(required=False)
    conditions = ConditionsInput(required=False)

class PatientType(DjangoObjectType):
    class Meta:
        model = PatientModel

class ConditionsType(DjangoObjectType):
    class Meta:
        model = ConditionsModel

# CRUD
# Create
class createPatient(graphene.Mutation):
    first_name = graphene.String()
    last_name = graphene.String()
    age = graphene.Int()
    contact_info = graphene.String()
    gender = graphene.String()
    avatar = Upload(required=False)
    conditions = graphene.Field(ConditionsType)

    class Arguments:
        first_name = graphene.String()
        last_name = graphene.String()
        age = graphene.Int()
        contact_info = graphene.String()
        gender = graphene.String()
        avatar = Upload(required=False)
        conditions = ConditionsInput(required=False, name="conditions")

    def mutate(self, info, first_name,last_name,age,contact_info,gender,conditions):
        condition = ConditionsModel(
                        condition_name=conditions.name,
                        severity=conditions.severity,
                        start_date=conditions.start_date,
                        end_date=conditions.end_date
                     )

        condition.save()
        conditions = ConditionsModel.objects.create(name=conditions.condition_name, severity=conditions.severity, start_date=conditions.start_date, end_date=conditions.end_date)

        patient = PatientModel(
            first_name   =  first_name,
            last_name    =  last_name,
            age          =  age, 
            contact_info =  contact_info,
            gender       =  gender,
            conditions   =  conditions
        )

        patient.save()
        
        return createPatient(
            first_name   = patient.first_name,
            last_name    = patient.last_name,
            age          = patient.age,
            contact_info = patient.contact_info,
            gender       = patient.gender,
            conditions   = patient.conditions
        )


# Read

class Query(graphene.ObjectType):
    patients = graphene.List(PatientType)
    patient_by_id = graphene.Field(PatientType, id=graphene.Int())

    def resolve_patients(self, info):
        return PatientModel.objects.all()
    
    def resolve_patient_by_id(self,info,id):
        return PatientModel.objects.get(pk=id)


class Mutation(graphene.ObjectType):
    create_patient = createPatient.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)