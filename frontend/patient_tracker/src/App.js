import './App.css';
import { graphql_server } from './constants.js';

import {
  BrowserRouter as Router,
  Route, Switch
} from 'react-router-dom'

import { DetailPatient } from './DetailPatient.js'

import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/client';

import {PatientInfo, CreatePatient} from './Patient.js';

const client = new ApolloClient({
  uri: graphql_server, 
});

const App = () => { 
    return (
      <Router>
        <ApolloProvider client={client}>
          <div className={"container"} style={{marginTop:'5%', marginBottom:'10%'}}>
            <Switch>
              < Route exact path="/" component={PatientInfo} />
              < Route exact path="/patients/:id" component={DetailPatient} />
              < Route exact path="/create" component={CreatePatient} />
            </Switch>
          </div>
        
        </ApolloProvider>
      </Router>
  )
};

export default App;