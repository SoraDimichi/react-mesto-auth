import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...props }) => (
  <Route>
    {
      // eslint-disable-next-line react/jsx-props-no-spreading
      () => (props.loggedIn ? <Component {...props} /> : <Redirect to="./sign-in" />)
    }
  </Route>
);

export default ProtectedRoute;
