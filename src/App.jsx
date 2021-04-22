//AIzaSyC01kkcugqzmXI768eUpE0GQoLn8srms4s
import { MDBContainer, MDBRow, MDBCol,MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import './App.css';
//import awsconfig from './aws-exports';
import React, { useState, useEffect } from 'react';
import { listTrucks } from './graphql/queries';
// import { updateTrucks } from './graphql/mutations';
// import { createTrucks } from './graphql/mutations';
// import { deleteTrucks } from './graphql/mutations';
//import Amplify, { API, graphqlOperation } from 'aws-amplify';
//import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';
import ProgressBar from "./components/progressBar";
import Camera from "./components/Camera";
import Home from "./components/home";

import { BrowserRouter as Router } from "react-router-dom";
import {Link, Route, Switch} from "react-router-dom"


function App() {
  return (
    <Router> 
    <div className="App">
      <Home/>
      <Switch>
        <Route path="/Camera" component={Camera}/>
        <Route path="/progressBar" component={ProgressBar}/>
      </Switch>
    </div>
    </Router>
  );
}



export default App;
