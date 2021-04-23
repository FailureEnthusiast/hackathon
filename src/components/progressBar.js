import React from "react";

import ReactStopwatch from 'react-stopwatch';
 
const ProgressBar = () => (
  <ReactStopwatch
    seconds={0}
    minutes={0}
    hours={0}
    limit="11:00:00"
    onChange={({ hours, minutes, seconds }) => {
      // do something
    }}
    onCallback={() => console.log('Finish')}
    render={({ hours, minutes, seconds }) => {
      return (
        <div>
            <p>Drive Timer</p>
          <p>
            Hours: { hours }
          </p>
          <p>
            Minutes: { minutes }
          </p>
          <p>
            Seconds: { seconds }
          </p>
        </div>
      );
    }}
   />
);
 
export default ProgressBar;