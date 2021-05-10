//CSS
import './camera.css';
import { MDBContainer, MDBRow, MDBCol,MDBBtn, MDBIcon } from 'mdb-react-ui-kit';

//React
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

//uuid library to provide unique id to jpeg
import { v4 as uuid } from 'uuid';

//AWS Amplify
import awsconfig from '../aws-exports';
import { listTrucks } from '../graphql/queries';
import Amplify, { API, graphqlOperation, Storage } from 'aws-amplify';
import { AmplifyS3Image, withAuthenticator } from '@aws-amplify/ui-react';
// import { updateTruck, createTruck } from '../graphql/mutations';
import logo from './logo.png';

// import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';

Amplify.configure(awsconfig);

function Camera() {
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


const styleLogo = {
    height: "20%",
    width: "20%"
}

const styleDashboard = {
  height: "80%",
  width: "80%",
  padding: "20px"
}

    return(
      <>
      { truck.map((truck, idx) => {
        return(
            <div key={`truck${idx}`}>
              <div id='logo'>
                <img src={logo} style={styleLogo}/>
            </div>  
                <div className='truckCard'>
                  <div>
                  <img src={truck.filePath} style={styleDashboard}/>
                  </div>
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
                        <td>Washer Fluid Low</td>
                        <td>{truck.washerFluid}</td>
                      </tr>
                    </tbody>
                  </table>
                 </div>
            </div>
          )
      })}
      </>
    );
  }
 



export default Camera;
