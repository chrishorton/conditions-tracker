import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_PATIENTS, CREATE_PATIENT } from './queries.js';
import { Link } from 'react-router-dom';

export function PatientInfo() {

    const { data, loading } = useQuery(
        QUERY_PATIENTS
    );

    if (loading) return <p>Loading...</p>;
        
    return data.patients.map(({ id, firstName, lastName, age, contactInfo, gender, avatar }) => (
        <div key={id} className={id}>
            <p>
                Patient - {id}: {firstName} {lastName}
            </p>

            <button style={{marginRight: "15px",marginBottom: '10px' }} className="btn btn-primary" type="button" data-toggle="collapse" data-target={"#collapse"+id} aria-expanded="false" aria-controls={"collapse"+id}>Details</button>
            <Link to={ "/patients/" + id }><button style={{marginLeft: "10px", marginBottom: '15px'}} className="row btn btn-primary">View Patient</button></Link>
            
            <div className="collapse" id={"collapse"+id}>
                <div className="card card-body">
                    <ul style={{listStyleType: 'none' }}>
                        <li>Age: { age }</li>
                        <li>Gender: { gender }</li>
                        <li>Contact: { contactInfo }</li>
                    </ul>
                </div>
            </div>
        </div>
    ));
}

export function CreatePatient() {
    let firstName, lastName, age, gender, contactInfo, conditionName, condition_severity, startDate, endDate;
    const [createPatient] = useMutation(CREATE_PATIENT);

    return (
        <div>
        <form
            onSubmit={e => {
            e.preventDefault();
            
            createPatient({ variables: {
                firstName: firstName.value,
                lastName: lastName.value,
                age: age.value,
                contactInfo: contactInfo.value,
                gender: gender.value,
                conditions: {
                    conditionName: conditionName.value,
                    severity: condition_severity.value,
                    startDate: startDate.value,
                    endDate: endDate.value,
                },
            } });
            
            window.location.reload();
        }}
            style = {{ marginTop: '2em', marginBottom: '2em' }}>
            
            {/* <button style={{paddingBottom: "10px" }} className="btn btn-primary" type="button" data-toggle="collapse" data-target={".collapseInput"} aria-expanded="false" aria-controls={"collapseInput"}>Add a Patient</button> */}
            
            <div style={{paddingTop: '20px'}} className="collapseInput">
                <input placeholder="First Name"
                    ref={node => {
                        firstName = node;
                    }}
                    style={{ marginRight: '1em' }}
                />
                
                <input placeholder="Last Name"
                    ref={node => {
                        lastName = node;
                    }}
                    style={{ marginRight: '1em' }}
                />
                
                <input placeholder="Email"
                    ref={node => {
                        contactInfo = node;
                    }}
                    style={{ marginRight: '1em' }}
                />
                
                <input placeholder="Gender"
                    ref={node => {
                        gender = node;
                    }}
                    style={{ marginRight: '1em' }}
                />

                <input placeholder="Age"
                    ref={node => {
                        age = node;
                    }}
                    style={{ marginRight: '1em' }}
                />

                <div className="form-group">
                    <label htmlFor="FormControlSelect" style={{ fontWeight: 'bold', paddingTop: '5px' }}>Conditions</label>
                    <select multiple className="form-control" id="FormControlSelect" ref={node => {
                        conditionName = node;
                    }}>
                        <option>Alzheimer’s disease</option>
                        <option>Arthritis</option>
                        <option>Asthma</option>
                        <option>Cancer</option>
                        <option>Diabetes</option>
                        <option>Heart disease</option>
                        <option>High blood pressure</option>
                        <option>High Cholesterol</option>
                        <option>Lower back pain</option>
                        <option>Migraine headaches</option>
                        <option>Stroke</option>
                    </select>
                </div>
                
                <div className="form-group">
                    <label htmlFor="FormControlSelect">Severity</label>
                    <select className="form-control" id="FormControlSelect" ref={node => {
                        condition_severity = node;
                    }}>
                        <option>0</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                    </select>
                </div>

                <p>format: "yyyy-mm-dd"</p>
                <input placeholder="Start Date"
                    ref={node => {
                        startDate = node;
                    }}
                    style={{ marginRight: '1em' }}
                />
                
                <input placeholder="End Date"
                    ref={node => {
                        endDate = node;
                    }}
                    style={{ marginRight: '1em' }}
                />
                
                <button className={"btn btn-primary"} type="submit" style={{ cursor: 'pointer' }}>Add to Database</button>
            </div>
        </form>
    </div>
    );}