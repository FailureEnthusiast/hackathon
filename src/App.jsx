import logo from './logo.svg';
import './App.css';
import awsconfig from './aws-exports';
import React, { useState, useEffect } from 'react';
import { listTrucks } from './graphql/queries';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
// import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';

Amplify.configure(awsconfig);

function App() {

    const [truck, setTrucks] = useState([]);

    useEffect(()=> {
      fetchTrucks()
    }, []);

    const fetchTrucks = async () => {
        try {
            const truckData = await API.graphql(graphqlOperation(listTrucks));
            const truckList = truckData.data.listTrucks.items;
            console.log('truck list', truckList);
            setTrucks(truckList);
        } catch (error) {
            console.log('error on fetching trucks', error);
        }
    };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
