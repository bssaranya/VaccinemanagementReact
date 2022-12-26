import { Route, Redirect } from 'react-router-dom';
import React from 'react';

const PrivateRouting = ({ children, isAuthenticated, ...rest }) => {
  if (!isAuthenticated) {
    return (
      <Redirect
        to={{
          pathname: '/',
        }}
      />
    );
  }
  return <Route {...rest} render={(tempProps) => children} />;
};
export default PrivateRouting;
