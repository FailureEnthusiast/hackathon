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
import SmartRecs from "./components/SmartRecs";
import Home from "./components/home";
import Map from "./components/map";
import { BrowserRouter as Router } from "react-router-dom";
import {Route, Switch} from "react-router-dom"

function App() {
  return (
    <Router> 
    <div className="App">
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/Camera" component={Camera}/>
        <Route path="/progressBar" component={ProgressBar}/>
        <Route path="/map" component={Map}/>
        <Route path="/SmartRecs" component={SmartRecs}/>
      </Switch>
    </div>
    </Router>
  );
}

export default App;