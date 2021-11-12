import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { PrivateRoute } from './routeAuthentication';
import ATM from '../screens/ATM';
import Login from '../screens/Login';

const Routes = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/atm" exact component={ATM} />
        {/* <PrivateRoute path="/atm" exact component={ATM} /> */}
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
