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
