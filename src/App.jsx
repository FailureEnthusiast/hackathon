//AIzaSyC01kkcugqzmXI768eUpE0GQoLn8srms4s
import { MDBContainer, MDBRow, MDBCol,MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import './App.css';
import awsconfig from './aws-exports';
import React, { useState, useEffect } from 'react';
import { listTrucks } from './graphql/queries';
import './Camera.jsx';
// import { updateTrucks } from './graphql/mutations';
// import { createTrucks } from './graphql/mutations';
// import { deleteTrucks } from './graphql/mutations';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';



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
    <>
      <MDBContainer>
        <MDBRow>
        <MDBCol className="col-md-8">
        <h2>TrackYourTruck</h2>
        </MDBCol>
        <MDBCol className="col-md-4">
        { truck.map((truck, idx) => {
            return(
                <div key={`truck${idx}`}>
                  <MDBIcon icon="users p-2" />
                  <div className="truckID">
                    Truck ID: {truck.id}
                  </div>
                  <div className="driverName">
                    Driver: {truck.lastName}, {truck.firstName}
                  </div>
                </div>
              )
          })}
        </MDBCol>
        </MDBRow>
       
        <MDBRow>
          <MDBCol className="col-md-3 my-2">
            <MDBBtn style={{ backgroundColor: '#808080'}} href="#">
              Maps
            </MDBBtn>
          </MDBCol>
          <MDBCol className="col-md-3 my-2">
            <MDBBtn style={{ backgroundColor: '#808080'}} href="#">
              Work log
            </MDBBtn>
          </MDBCol>
        <MDBCol className="col-md-3 my-2">
            <MDBBtn style={{ backgroundColor: '#808080'}} href="Camera">
            Maintence Log
            </MDBBtn>
          </MDBCol>
          <MDBCol className="col-md-3 my-2">
            <MDBBtn style={{ backgroundColor: '#808080'}} href="#">
              Load Log
            </MDBBtn>
          </MDBCol>
          </MDBRow>
          <MDBRow>
          <MDBCol className="col-md-3 my-2">
            <MDBBtn style={{ backgroundColor: '#808080'}} href="#">
              Messages
            </MDBBtn>
          </MDBCol>
          <MDBCol className="col-md-3 my-2">
            <MDBBtn style={{ backgroundColor: '#808080'}} href="#">
              menu item
            </MDBBtn>
          </MDBCol>
        <MDBCol className="col-md-3 my-2">
            <MDBBtn style={{ backgroundColor: '#808080'}} href="#">
              menu item
            </MDBBtn>
          </MDBCol>
          <MDBCol className="col-md-3 my-2">
            <MDBBtn style={{ backgroundColor: '#808080'}} href="#">
              menu item
            </MDBBtn>
          </MDBCol>
          </MDBRow>
          <MDBBtn style={{ backgroundColor: '#808080'}}><AmplifySignOut /></MDBBtn>
    </MDBContainer>
    
    </>


  );
}

export default withAuthenticator(App);