//AIzaSyC01kkcugqzmXI768eUpE0GQoLn8srms4s
import { MDBContainer, MDBRow, MDBCol,MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import awsconfig from '../aws-exports';
import React, { useState, useEffect } from 'react';
import { listTrucks } from '../graphql/queries';
// import { updateTrucks } from './graphql/mutations';
// import { createTrucks } from './graphql/mutations';
// import { deleteTrucks } from './graphql/mutations';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';
import ProgressBar from "../components/progressBar";
// import { BrowserRouter as Router } from "react-router-dom";
import {Link} from "react-router-dom"
// import Camera from './Camera';


Amplify.configure(awsconfig);

function Home() {

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
        <MDBBtn style={{ backgroundColor: '#808080'}}><AmplifySignOut /></MDBBtn>
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
        <div className="d-flex justify-content-center border border-light p-5">
       <ProgressBar/>
       </div>
        <MDBRow>
          <MDBCol className="col-md-3 my-2">
           <Link to="/map">
            <MDBBtn style={{ backgroundColor: '#808080'}}>
              My stops
            </MDBBtn>
            </Link>
          </MDBCol>
          <MDBCol className="col-md-3 my-2">
            <MDBBtn style={{ backgroundColor: '#808080'}} href="#">
              work log
            </MDBBtn>
          </MDBCol>
        <MDBCol className="col-md-3 my-2">
            
        <Link to="/Camera">
            <MDBBtn style={{ backgroundColor: '#808080'}} href="#">
              Maitenenace log
            </MDBBtn>
        </Link>
      
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
         
    </MDBContainer>
 
    </>


  );
}

export default withAuthenticator(Home);