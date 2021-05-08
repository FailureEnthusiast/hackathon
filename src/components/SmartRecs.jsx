//CSS
import './camera.css';
import { MDBContainer, MDBRow, MDBCol,MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import PublishIcon from '@material-ui/icons/Publish';
import { Paper, IconButton, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

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
import { updateTruck, createTruck } from '../graphql/mutations';

// import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';

import logo from './logo.png'

Amplify.configure(awsconfig);

const AddTruck = ({onUpload}) => {

  const [truckData, setTruckData] = useState({});
  const [imgData, setImgData] = useState()
  
  const uploadTruck = async () => {
      //Upload the new truck
      console.log('truckData', truckData)
      const { id, lastName } = truckData
      const { key } = await Storage.put(`${uuid()}.jpg`, imgData, { contentType: 'image/jpg/png' });
      const createTruckInput = {
          id: uuid(),
          lastName,
          filePath: key
      }
      await API.graphql(graphqlOperation(createTruck, {input: createTruckInput}))
      onUpload();
  }

  return (
      <div className='newTruck'>
          <TextField 
              label='id'
              value={truckData.id}
              onChange={e => setTruckData({...truckData, name: e.target.value})}
          />
          <TextField 
              label='lastName'
              value={truckData.lastName}
              onChange={e => setTruckData({...truckData, result: e.target.value})}
          />
          <input type='file' accept='image/jpg/png' onChange={e => setImgData(e.target.files[0])}></input>
          <IconButton onClick={uploadTruck}>
              <PublishIcon />
          </IconButton>
      </div>
  )
}

function SmartRecs() {
  const [truck, setTrucks] = useState([]);
  const [truckOn, setTruckOn] = useState('');
  const [truckURL, setTruckURL] = useState('');
  const [showAddTruck, setShowAddNewTruck] = useState(false);

  useEffect(()=> {
    fetchTrucks()
  }, []);

  const toggleTruck = async idx => {
    if (truckOn === idx) {
        setTruckOn('')
        return;
    }


    //get file path from products array
    const truckFilePath = truck[idx].filePath;
    try {
        const fileAccessURL = await Storage.get(truckFilePath, { expires: 60 });
        console.log('access url', fileAccessURL);
        setTruckOn(idx);
        setTruckURL(fileAccessURL)
        return
    } catch (error) {
        console.log('error accessing the file from s3', error);
        setTruckURL('');
        setTruckOn('')
    }
};


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

  const styleDashboard = {
    height: "95%",
    width: "95%",
    padding: '10px',     
    display: "block"
  }


  const styleLogo = {
    height: "20%",
    width: "20%"
}

    return(
      
      <div className='recList'>
        <div id='logo'>
          <img src={logo} style={styleLogo}/>
        </div> 

      { truck.map((truck) => {
        
        return(
            
          <div className='truckCard'>
            <div id='lasttDashboard'>
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
            
          );
      })};

      </div>
    );
  }
 



export default SmartRecs;
