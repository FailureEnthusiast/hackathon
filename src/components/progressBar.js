import React from "react";
import {MDBCard, MDBCol, MDBContainer, MDBRow} from "mdb-react-ui-kit";
import ReactStopwatch from 'react-stopwatch';
 
const ProgressBar = () => (
  <ReactStopwatch
    seconds={0}
    minutes={0}
    hours={0}
    limit="11:00:00"
    onChange={({ hours, minutes, seconds }) => {
      // todo: at 5 hours push alter for break and change color
      // todo: at 10H 30 mins of active driving give warning to stop in 30 mins
    }}
    onCallback={() => console.log('Finish')}
    render={({ hours, minutes, seconds }) => {
      return (
        <div>
          <MDBContainer>
            <p>Drive Timer</p>
            <MDBRow>
            <MDBCol className="col-md-4 my-2">H:{ hours } </MDBCol>
            <MDBCol className="col-md-4 my-2">Min:{ minutes } </MDBCol>
            <MDBCol className="col-md-4 my-2">Sec:{ seconds } </MDBCol>
          </MDBRow>
          </MDBContainer>
        </div>
      );
    }}
   />
);
 
export default ProgressBar;