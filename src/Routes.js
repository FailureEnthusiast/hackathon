import './App.css';
import React from 'react';
import { App } from './App';
import { Camera } from './components/Camera';
import { Clock } from './components/Clock';

import { Route, Switch, Redirect } from 'react-router-dom';

export const Routes = () => {
  return (
    <div>
      <Login />
      <center><Header /></center>
      <center><img src={profile} alt="profile" height="20%" width="20%" /></center>
      <center><NavBar /></center>
      <Switch>
        <Route exact path="/">
          <Redirect to="/" />
        </Route>
        <Route exact path="/" component={App} />
        <Route exact path="/Camera" component={Camera} />
        <Route exact path="/Clock" component={Clock} />
      </Switch>
    </div>
  );
};

export default Routes;