import * as React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import RouteConfig from './config';

/* eslint-disable */
export default () => (<Router>
  <div>
    <Route exact path="/" render={() => <Redirect push to="/home" />}/>
    {RouteConfig.map(r => (
      <Route {...r} />
    ))}
  </div>
</Router>);
