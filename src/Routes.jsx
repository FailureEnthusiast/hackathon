import './App.css';
import React from 'react';
import {ClockApp} from './components/Clock';
import {Camera} from './components/Camera';


import { Route, Switch, Redirect } from 'react-router-dom';

export const Routes = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Redirect to="/" />
        </Route>
        <Route exact path="/" component={App} />
        <Route exact path="/Camera" component={Camera} />
        <Route exact path="/Clock" component={ClockApp} />
      </Switch>
    </div>
  );
};

export default Routes;