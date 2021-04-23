
//MaterialDesignBootstrap
import { MDBContainer, MDBRow, MDBCol,MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import './camera.css';

//React
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
//AWS Amplify
import awsconfig from '../aws-exports';
import  { listTrucks } from './../graphql/queries';
import Amplify, { API, graphqlOperation, Storage } from 'aws-amplify';
import { AmplifyS3Image, withAuthenticator } from '@aws-amplify/ui-react';

// import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';


Amplify.configure(awsconfig);

function Camera() {

    const [truck, setTrucks] = useState([]);
    const [truckOn, setTruckOn] = useState('');
    const [truckURL, setTruckURL] = useState('');

    useEffect(()=> {
      fetchTrucks()
    }, []);


    const toggleTruck = async idx => {
      if (truckOn === idx) {
          setTruckOn('');
          return;
      }

        //get file path from truck array
        const truckFilePath = truck[idx].filePath;
        try {
          const fileAccessURL = await Storage.get(truckFilePath, { expires: 60 });
          console.log('access url', fileAccessURL);          
          setTruckOn(idx);
          setTruckURL(fileAccessURL);
              return
        } catch (error) {
            console.log('error accessing the file from s3', error);
            setTruckURL('');         
            setTruckOn('');
          }
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

              <div 
              className='truckCard'>
                 <Link to="/">
    <MDBBtn style={{ backgroundColor: '#808080'}}
    >Home Page
    </MDBBtn>
    </Link>
                  <p><AmplifyS3Image path={truck.filePath} /></p>
                  <table>
                    <thead>
                      <tr>
                          <th>Indicator</th>
                          <th>Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Fuel Level</td>
                        <td>{truck.lowFuel}</td>
                      </tr>
                      <tr>
                        <td>Speed</td>
                        <td>{truck.speed}</td>
                      </tr>
                      <tr>
                        <td>Lamp Out</td>
                        <td>{truck.lampOut}</td>
                      </tr>
                      <tr>
                        <td>Fog Lamp On</td>
                        <td>{truck.fogLamp}</td>
                      </tr>
                      <tr>
                        <td>Oil</td>
                        <td>{truck.oil}</td>
                      </tr>
                      <tr>
                        <td>Tire Pressure</td>
                        <td>{truck.tire}</td>
                      </tr>
                      <tr>
                        <td>Engine Temperature</td>
                        <td>{truck.engTemp}</td>
                      </tr>
                      <tr>
                        <td>Traction</td>
                        <td>{truck.traction}</td>
                      </tr>
                      <tr>
                        <td>Antilock Break On</td>
                        <td>{truck.antilockBreak}</td>
                      </tr>
                      <tr>
                        <td>Traction Control Malfunction</td>
                        <td>{truck.tractionControlMalfunction}</td>
                      </tr>
                      <tr>
                        <td>Engine Warning</td>
                        <td>{truck.engineWarning}</td>
                      </tr>
                      <tr>
                        <td>Battery</td>
                        <td>{truck.battery}</td>
                      </tr>
                      <tr>
                        <td>Seat Belt On </td>
                        <td>{truck.seatBelt}</td>
                      </tr>
                      <tr>
                        <td>Air Bag</td>
                        <td>{truck.airbag}</td>
                      </tr>
                      <tr>
                        <td>Washer Fluid Low</td>
                        <td>{truck.washerFluid}</td>
                      </tr>
                    </tbody>
                  </table>
                 </div>
    
  );
}

export default Camera;
