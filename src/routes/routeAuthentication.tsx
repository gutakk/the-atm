import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useAppSelector } from '../hooks/useApp';

type RouteAuthenticationProps = {
  component: () => JSX.Element;
  path: string;
  exact?: boolean;
};

export const PrivateRoute = ({ ...props }: RouteAuthenticationProps): JSX.Element => {
  const { isLoggedin } = useAppSelector((state) => state.user);

  if (isLoggedin) {
    return <Route {...props} />
  }
  return <Redirect to="/" />
}

