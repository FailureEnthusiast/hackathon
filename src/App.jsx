import './App.css';
import awsconfig from './aws-exports';
import React, { useState, useEffect } from 'react';
import { listTrucks } from './graphql/queries';
// import { updateTrucks } from './graphql/mutations';
// import { createTrucks } from './graphql/mutations';
// import { deleteTrucks } from './graphql/mutations';
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
        <h2>Trucking App</h2>
      </header>
      <div className="truckList">
          { truck.map((truck, idx) => {
            return(
                <div key={`truck${idx}`}>
                  <div className="truckID">
                    Truck ID: {truck.id}
                  </div>
                  <div className="driverName">
                    Driver: {truck.lastName}, {truck.firstName}
                  </div>
                  <div className="driverVitals">
                      Heart Rate: {truck.heartRate} | Oxygen: {truck.oxygen} | Blood Pressure: {truck.systolic}/{truck.diastolic} | Temperature: {truck.temperature}
                  </div>
                  <div className="truckHealth">
                    Location: {truck.location} | Fuel Level: {truck.lowFluel} | Lamp: {truck.lampOut} | Fog Lamp: {truck.fogLamp} | Oil: {truck.oil} | Tire Pressure: {truck.tire} | Engine Temperature: {truck.engTemp} | Traction: {truck.traction} | Antilock Break: {truck.antilockBreak} | Traction Control: {truck.tractionControlMalfunction} | Engine: {truck.engineWarning} | Battery: {truck.battery} | Seat belt: {truck.seatBelt} | Air Bag: {truck.airbag} | Washer Fluid: {truck.washerFluid}
                  </div>
                  <div className="dashboardImg">
                    <img src={truck.img} height='60%' width='60%'></img>
                  </div>
                </div>
              )
          })}
      </div>
    </div>
  );
}

export default App;
