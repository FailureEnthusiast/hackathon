
import awsconfig from '../aws-exports';
import React, { useState, useEffect } from 'react';
import { listTrucks } from '../graphql/queries';
import { MDBContainer, MDBRow, MDBCol,MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
// import { updateTrucks } from './graphql/mutations';
// import { createTrucks } from './graphql/mutations';
// import { deleteTrucks } from './graphql/mutations';
import Amplify, { API, graphqlOperation, Storage } from 'aws-amplify';
// import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';


Amplify.configure(awsconfig);

function Camera() {
    const [truck, setTrucks] = useState([]);
    const [truckPlaying, setTruckPlaying] = useState('');
    const [truckURL, setTruckURL] = useState('');


    useEffect(()=> {
      fetchTrucks()
    }, []);

    const toggleTruck = async idx => {
      if (truckPlaying === idx) {
          setTruckPlaying('');
          return;
      }


    const truckFilePath = truck[idx].filePath;
    try {
      const fileAccessURL = await Storage.get(truckFilePath, { expires: 60 });
      console.log('access url', fileAccessURL);          
      setTruckPlaying(idx);
      setTruckURL(fileAccessURL);
          return;
     } catch (error) {
        console.error('error accessing the file from s3', error);
        setTruckURL('');         
       setTruckPlaying('');
      }


      setTruckPlaying(idx);
      return
  }

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

      </header>
      <div className="truckList">
          { truck.map((truck, idx) => {
            return(
                <div key={`truck${idx}`}>
                  <div className="dashboardImg">
                    <img src={truck.img} height='60%' width='60%'></img>
                  </div>
                  <div className="truckHealth">
                    Fuel Level: {truck.lowFuel} 
                    | Lamp: {truck.lampOut} 
                    | Fog Lamp: {truck.fogLamp} 
                    | Oil: {truck.oil} 
                    | Tire Pressure: {truck.tire} 
                    | Engine Temperature: {truck.engTemp} 
                    | Traction: {truck.traction} 
                    | Antilock Break: {truck.antilockBreak} 
                    | Traction Control: {truck.tractionControlMalfunction} 
                    | Engine: {truck.engineWarning} 
                    | Battery: {truck.battery} 
                    | Seat belt: {truck.seatBelt} 
                    | Air Bag: {truck.airbag} 
                    | Washer Fluid: {truck.washerFluid}
                  </div>
                 <div className="div">
                 </div>
                </div>
              )
          })}
      </div>
    </div>
  );
}

export default Camera;
