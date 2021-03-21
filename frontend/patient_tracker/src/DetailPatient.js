import React from "react";
import {useParams} from "react-router-dom";
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_SINGLE_PATIENT } from './queries.js';

export function DetailPatient () {
    const {id} = useParams()
    
    const { data, loading } = useQuery(
        QUERY_SINGLE_PATIENT, { variables: { id: id } }
    );
        
    if (loading) return <p>Loading...</p>;

    return ( 
        <div>
            <h2>{data.patientById.firstName}</h2>
            
            <ul style={{listStyleType:'none'}}>
                <li>{data.patientById.id}</li>
                <li>{data.patientById.lastName}</li>
                <li>{data.patientById.age}</li>
                <li>{data.patientById.contactInfo}</li>
                <li>{data.patientById.gender}</li>
            </ul>
            <h3>Conditions</h3>
            <div key={id} className={id}>
                <ul>
                    <li>{data.patientById.conditions.conditionName}</li>
                    <li>{data.patientById.conditions.severity}</li>
                    <li>{data.patientById.conditions.startDate}</li>
                    <li>{data.patientById.conditions.endDate}</li>
                </ul>
            </div>
        </div>
    )
};