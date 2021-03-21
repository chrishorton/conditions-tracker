import { gql } from 'apollo-boost';

export const QUERY_PATIENTS = gql`
    query {
        patients {
            id
            firstName
            lastName
            age
            gender
            avatar
            contactInfo
            conditions {
                id
                conditionName
                severity
                startDate
                endDate
            }
        }
    }`;

export const CREATE_PATIENT = gql`
    mutation 
        (
            $firstName:String!,
            $lastName:String!,
            $contactInfo:String!,
            $age:Int!,
            $gender:String!,
            $conditions: ConditionsInput!
        ){
            createPatient (
                firstName:$firstName,
                lastName:$lastName,
                contactInfo:$contactInfo,
                age:$age,
                gender:$gender,
                conditions: $conditions
            ){
                firstName
            }
        }
`;

export const QUERY_SINGLE_PATIENT = gql` 
    query($id: Int!) {
        patientById(id: $id) {
            id
            firstName
            lastName
            age
            gender
            avatar
            contactInfo
            conditions {
                id
                conditionName
                severity
                startDate
                endDate
            }
        }
    }
`;

const UPDATE_PATIENT = gql`
  mutation UpdatePatient ($id: Int!, $text: String!, $isCompleted: Boolean!) {
    updatePatient (id: $id, text: $text, isCompleted: $isCompleted) {
        id
    }
  }
`;


export const DELETE_PATIENT = gql`
  mutation DeletePatient($id: Int!) {
    deletePatient(id: $id) {
      id
    }
  }
`;
