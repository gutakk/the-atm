import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { render } from '@testing-library/react';
import { createBrowserHistory } from 'history';

import { PrivateRoute } from '../../routes/routeAuthentication';
import ATM from '../../screens/ATM';

const mockStore = configureStore();

describe('routeAuthentication', () => {
  describe('given authorized user', () => {
    it('does not redirect when visit to private route', () => {
      const history = createBrowserHistory();
      const initialState = {
        atm: {
          withdrawAmount: 0
        },
        user: {
          isLoggedin: true
        }
      };
      const store = mockStore(initialState);

      history.push('/atm');
      render(
        <Router history={history}>
          <Provider store={store}>
            <PrivateRoute path="/atm" exact component={ATM} />
          </Provider>
        </Router>
      );

      expect(history.location.pathname).toBe('/atm');
    });
  });

  describe('given unauthorized user', () => {
    it('redirect back to home when visit to private route', () => {
      const history = createBrowserHistory();
      const initialState = {
        atm: {
          withdrawAmount: 0
        },
        user: {
          isLoggedin: false
        }
      };
      const store = mockStore(initialState);

      history.push('/atm');
      render(
        <Router history={history}>
          <Provider store={store}>
            <PrivateRoute path="/atm" exact component={ATM} />
          </Provider>
        </Router>
      );

      expect(history.location.pathname).toBe('/');
    });
  });
});
