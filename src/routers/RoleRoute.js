/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import Navigator from '../containers/Navigator';

export const PrivateRoute = ({
  isAuthenticated,
  role,
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    component={props => (
      isAuthenticated && role === 'admin' ? (
        <>
          <Component {...props} />
          <Navigator />
        </>
      ) : (
        <Redirect to="/" />
      )
    )}
  />
);

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  role: PropTypes.string.isRequired,
  component: PropTypes.elementType.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.token,
  role: state.userData.role,
});

export default connect(mapStateToProps)(PrivateRoute);
